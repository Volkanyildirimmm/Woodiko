'use client'

import { AuthProvider } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { 
  LayoutDashboard, 
  FileText, 
  Images, 
  Briefcase, 
  Settings, 
  LogOut,
  Wrench,
  ExternalLink,
  Inbox,
  MessageSquare
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') {
    return <AuthProvider>{children}</AuthProvider>
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Gelen Formlar', href: '/admin/forms', icon: Inbox },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Projeler', href: '/admin/projects', icon: Briefcase },
    { name: 'Hizmetler', href: '/admin/services', icon: Wrench },
    { name: 'Yorumlar', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Galeri', href: '/admin/gallery', icon: Images },
    { name: 'Ayarlar', href: '/admin/settings', icon: Settings },
  ]

  return (
    <AuthProvider>
      <div className="flex h-screen bg-cream-light font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-wood-dark text-cream flex flex-col">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-2" target="_blank">
              <span className="w-8 h-8 bg-gold rounded flex items-center justify-center font-serif font-bold text-wood-dark">
                W
              </span>
              <span className="font-serif font-bold tracking-widest">WOODIKO</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = item.href === '/admin' 
                ? pathname === '/admin' 
                : (pathname === item.href || pathname?.startsWith(item.href + '/'))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-gold text-wood-dark font-medium' 
                      : 'text-cream/70 hover:bg-wood-medium/50 hover:text-cream'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-wood-medium/30">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-cream/70 hover:bg-wood-medium/50 hover:text-cream transition-colors"
            >
              <LogOut size={18} />
              Çıkış Yap
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="bg-white border-b border-cream px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-wood-dark font-serif">Yönetim Paneli</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-wood-medium hidden md:block">
                Woodiko Admin v1.0
              </span>
              <Link 
                href="/" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-wood-dark text-cream hover:bg-gold hover:text-wood-dark transition-colors rounded-lg font-medium text-sm shadow-sm"
              >
                Siteye Git <ExternalLink size={16} />
              </Link>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-8 bg-cream-light">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
