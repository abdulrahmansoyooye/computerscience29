"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, BookOpen, Search, User, LogOut, Menu, X, Bell, Bookmark, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [matricNumber, setMatricNumber] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/user");
                const data = await res.json();
                if (data.success) {
                    setMatricNumber(data.matricNumber);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            const data = await res.json();
            if (data.success) {
                router.push("/login");
                router.refresh();
            }
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const navLinks = [
        { href: "/", label: "Library", icon: BookOpen },
        { href: "/courses", label: "Courses", icon: GraduationCap },
        { href: "/announcements", label: "Notices", icon: Bell },
        { href: "/bookmarks", label: "Saved", icon: Bookmark },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-xl tracking-tight group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10 dark:shadow-white/5"
                            >
                                <GraduationCap size={22} strokeWidth={2.5} />
                            </motion.div>
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                                CSC29
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                        {navLinks.map((link) => (
                            <NavLink key={link.href} href={link.href} active={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            {mounted && (theme === "dark" ? <Sun size={22} /> : <Moon size={22} />)}
                        </motion.button>

                        <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

                        {/* User Menu */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all shadow-md shadow-slate-900/10"
                            >
                                <div className="w-6 h-6 rounded-full bg-slate-700 dark:bg-slate-200 flex items-center justify-center">
                                    <User size={14} />
                                </div>
                                <span className="text-sm font-semibold truncate max-w-[100px]">
                                    {matricNumber ? matricNumber.split('/').pop() : 'Student'}
                                </span>
                            </motion.button>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl z-20 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Signed in as</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{matricNumber || "Guest"}</p>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                <Link
                                                    href="/profile"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium"
                                                >
                                                    <User size={18} />
                                                    Your Profile
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors font-medium"
                                                >
                                                    <LogOut size={18} />
                                                    Logout from Portal
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${pathname === link.href ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                                        }`}
                                >
                                    <link.icon size={20} />
                                    <span className="font-semibold">{link.label}</span>
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold transition-all"
                                >
                                    <LogOut size={20} />
                                    Logout Session
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative ${active
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
        >
            <span className="relative z-10">{children}</span>
            {active && (
                <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
        </Link>
    );
}
