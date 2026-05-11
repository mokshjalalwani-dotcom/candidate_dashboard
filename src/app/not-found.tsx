import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="text-8xl font-black text-gray-100 dark:text-gray-800 select-none">
          404
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Page not found</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg hover:from-violet-700 hover:to-indigo-700 transition-all"
        >
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
