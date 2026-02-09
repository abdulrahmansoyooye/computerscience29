import Link from "next/link";
import { ChevronLeft, Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 mb-8">
                    <Ghost size={48} />
                </div>
                <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4">404</h1>
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-8">Resource not found</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto">
                    The material you are looking for might have been moved, archived, or is being prepared for the next semester.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity"
                >
                    <ChevronLeft size={20} />
                    Return to Library
                </Link>
            </div>
        </div>
    );
}
