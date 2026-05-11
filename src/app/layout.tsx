import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ApplicantStoreProvider } from '@/store/StoreContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TalentFlow — Candidate Management Dashboard',
  description: 'A modern, recruiter-ready candidate management dashboard. Search, filter, and track internship applicants with ease.',
  keywords: ['recruitment', 'candidates', 'dashboard', 'hiring', 'internship'],
  authors: [{ name: 'TalentFlow' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased dark:bg-gray-950">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <ApplicantStoreProvider>
            {children}
          </ApplicantStoreProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '12px',
                background: '#1e1e2e',
                color: '#e2e8f0',
                fontSize: '13px',
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
              },
              success: { iconTheme: { primary: '#34d399', secondary: '#1e1e2e' } },
              error: { iconTheme: { primary: '#f87171', secondary: '#1e1e2e' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

