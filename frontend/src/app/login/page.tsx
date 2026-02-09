"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, ShieldCheck, GraduationCap, ArrowRight, Sparkles, UserCheck } from "lucide-react";

export default function LoginPage() {
    const [matricNumber, setMatricNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matricNumber, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/");
                router.refresh();
            } else {
                setError(data.message || "Invalid credentials. Please contact your administrator.");
            }
        } catch (err) {
            setError("Connection failed. Please check your internet and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-white dark:bg-slate-950 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.15, 0.05],
                        rotate: [0, -45, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="w-full max-w-[440px] relative"
            >
                {/* Decorative border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2.5rem] blur-xl opacity-50" />

                <div className="relative bg-white dark:bg-slate-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:shadow-2xl rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="pt-12 pb-8 px-8 text-center bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-800/20">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 mb-8 shadow-2xl shadow-slate-900/20 dark:shadow-white/10"
                        >
                            <GraduationCap size={40} strokeWidth={2.5} />
                        </motion.div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                            CSC29 <span className="text-blue-600 dark:text-blue-400">Portal</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base px-4">
                            Welcome back. Please authorize to access your academic resources.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="p-8 space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">
                                    Matriculation ID
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="CSC/20XX/XXX"
                                        value={matricNumber}
                                        onChange={(e) => setMatricNumber(e.target.value.toUpperCase())}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all font-bold tracking-wide"
                                        required
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                        <Sparkles size={18} className="text-blue-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">
                                    Security Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all font-bold"
                                    required
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs font-bold border border-red-100 dark:border-red-900/20"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5 disabled:opacity-50 group"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={22} strokeWidth={2.5} />
                                    Unlock Materials
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="px-8 pb-10">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                            <div className="mt-0.5 p-1 rounded-lg bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900">
                                <ShieldCheck size={16} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Protected Access</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-tight uppercase tracking-tight">
                                    This portal uses end-to-end encryption. Only registered students of CSC29 can access materials.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-slate-400 dark:text-slate-600 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                        <UserCheck size={14} /> Class of 29 &bull; Computer Science
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
