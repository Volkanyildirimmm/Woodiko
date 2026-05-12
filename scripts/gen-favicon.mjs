// Woodiko favicon üretici. Brand renkleri ile 32x32 W çizip
// 16x16'ya 2x2 averaging ile downsample ediyor; ikisini multi-size .ico
// olarak public/favicon.ico'ya yazıyor. Logo değişirse bu script re-run edilebilir.
//
// Çalıştırma: node scripts/gen-favicon.mjs

import { writeFileSync, mkdirSync } from 'node:fs'
import { deflateSync } from 'node:zlib'
import { dirname } from 'node:path'

const BG = [0x5c, 0x3a, 0x21] // wood-medium
const FG = [0xf5, 0xf0, 0xe8] // cream
const OUT = 'public/favicon.ico'

const W_VERTICES = [
  [5, 7],
  [12, 25],
  [16, 14],
  [20, 25],
  [27, 7],
]
const STROKE_PX = 3

function makeBitmap32() {
  const size = 32
  const grid = new Uint8Array(size * size)
  const r = Math.floor(STROKE_PX / 2)
  for (let i = 0; i < W_VERTICES.length - 1; i++) {
    const [x0, y0] = W_VERTICES[i]
    const [x1, y1] = W_VERTICES[i + 1]
    drawLine(grid, size, x0, y0, x1, y1, r)
  }
  return grid
}

function drawLine(grid, size, x0, y0, x1, y1, r) {
  const dx = Math.abs(x1 - x0)
  const dy = Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx - dy
  let x = x0,
    y = y0
  for (let safety = 0; safety < size * size; safety++) {
    for (let bx = -r; bx <= r; bx++) {
      for (let by = -r; by <= r; by++) {
        const px = x + bx,
          py = y + by
        if (px >= 0 && px < size && py >= 0 && py < size) {
          grid[py * size + px] = 1
        }
      }
    }
    if (x === x1 && y === y1) break
    const e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      x += sx
    }
    if (e2 < dx) {
      err += dx
      y += sy
    }
  }
}

function gridToRGB(grid, size) {
  const data = Buffer.alloc(size * size * 3)
  for (let i = 0; i < grid.length; i++) {
    const c = grid[i] ? FG : BG
    data[i * 3] = c[0]
    data[i * 3 + 1] = c[1]
    data[i * 3 + 2] = c[2]
  }
  return data
}

function downsample2x(rgb, srcSize) {
  const dstSize = srcSize / 2
  const dst = Buffer.alloc(dstSize * dstSize * 3)
  for (let y = 0; y < dstSize; y++) {
    for (let x = 0; x < dstSize; x++) {
      let r = 0,
        g = 0,
        b = 0
      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const si = ((y * 2 + dy) * srcSize + (x * 2 + dx)) * 3
          r += rgb[si]
          g += rgb[si + 1]
          b += rgb[si + 2]
        }
      }
      const di = (y * dstSize + x) * 3
      dst[di] = Math.round(r / 4)
      dst[di + 1] = Math.round(g / 4)
      dst[di + 2] = Math.round(b / 4)
    }
  }
  return dst
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32buf(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32buf(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function encodePNG(rgb, size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // color type RGB
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  const stride = size * 3
  const raw = Buffer.alloc((stride + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0 // filter: None
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }
  const idat = deflateSync(raw)
  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

function buildICO(images) {
  const headerSize = 6 + 16 * images.length
  let offset = headerSize
  const entries = images.map((img) => {
    const e = Buffer.alloc(16)
    e[0] = img.size === 256 ? 0 : img.size
    e[1] = img.size === 256 ? 0 : img.size
    e[2] = 0
    e[3] = 0
    e.writeUInt16LE(1, 4) // planes
    e.writeUInt16LE(24, 6) // bits per pixel
    e.writeUInt32LE(img.png.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += img.png.length
    return e
  })
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // ICO
  header.writeUInt16LE(images.length, 4)
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)])
}

const grid32 = makeBitmap32()
const rgb32 = gridToRGB(grid32, 32)
const rgb16 = downsample2x(rgb32, 32)

const png32 = encodePNG(rgb32, 32)
const png16 = encodePNG(rgb16, 16)

const ico = buildICO([
  { size: 32, png: png32 },
  { size: 16, png: png16 },
])

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, ico)
console.log(`${OUT}: ${ico.length} bytes (32x32 + 16x16)`)
