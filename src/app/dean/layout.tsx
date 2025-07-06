import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen bg-gray-100">
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
