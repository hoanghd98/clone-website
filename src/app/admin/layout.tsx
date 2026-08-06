'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Newspaper, 
  Image as ImageIcon, 
  Mail,
  LogOut,
  Home,
  UserRound,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Quản lý Tin tức', href: '/admin/news', icon: Newspaper },
    { name: 'Thư viện ảnh', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Tin nhắn liên hệ', href: '/admin/contacts', icon: Mail },
    { name: 'Tài khoản', href: '/admin/account', icon: UserRound },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-primary-dark">NAM PHUONG Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
                            (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-primary-dark' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navigation.find(n => pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href)))?.name || 'Dashboard'}
          </h2>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
