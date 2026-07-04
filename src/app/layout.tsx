import "./globals.css";
import type { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';
import '@/app/globals.css'; // Make sure globals path matches your layer configuration

export const metadata: Metadata = {
  title: 'AI Receptionist Portal - Aesthetic Clinic',
  description: 'Automated Healthcare Omni-channel Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans antialiased">
        <div className="flex">
          {/* Persistent System Sidebar Navigation */}
          <Sidebar />
          
          {/* Main Dashboard Workspace Screen wrapper */}
          <main className="flex-1 pl-64 min-h-screen">
            <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}