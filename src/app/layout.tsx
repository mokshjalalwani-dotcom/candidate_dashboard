import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TalentFlow — Candidate Management Dashboard',
  description:
    'A modern, recruiter-ready candidate management dashboard. Search, filter, sort and track internship applicants with ease.',
  keywords: ['recruitment', 'candidates', 'dashboard', 'hiring', 'internship', 'talent'],
  authors: [{ name: 'TalentFlow' }],
  openGraph: {
    title: 'TalentFlow — Candidate Management Dashboard',
    description: 'Track and manage internship applicants effortlessly.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased dark:bg-gray-950 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '12px',
                background: '#18181b',
                color: '#f4f4f5',
                fontSize: '13px',
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.32)',
                border: '1px solid rgba(255,255,255,0.08)',
              },
              success: { iconTheme: { primary: '#34d399', secondary: '#18181b' } },
              error: { iconTheme: { primary: '#f87171', secondary: '#18181b' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
