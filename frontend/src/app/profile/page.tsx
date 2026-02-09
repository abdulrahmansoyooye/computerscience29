import Navbar from "@/components/layout/Navbar";
import { getUser } from "@/lib/auth";
import { User, LogOut, Shield, MapPin, Calendar, Clock, BookOpen, Stars } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const matricNumber = await getUser();

    if (!matricNumber) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                <div className="relative mb-12">
                    <div className="h-48 md:h-64 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 overflow-hidden relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                    </div>

                    <div className="absolute -bottom-8 left-8 md:left-12 flex items-end gap-6">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-white dark:bg-slate-950 p-2 shadow-2xl">
                            <div className="w-full h-full rounded-[2rem] bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                <User size={64} strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="pb-8">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                Academic Profile
                            </h1>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 dark:border-emerald-900/30 w-fit">
                                <Shield size={12} fill="currentColor" /> Verified CS Student
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                    <User size={16} />
                                </span>
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matriculation Number</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white uppercase">{matricNumber}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">Computer Science</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Year</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">2025/2026</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">Active Student</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800/50">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                    <Stars size={16} />
                                </span>
                                Recent Activity
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Accessed CSC 305 Notes</p>
                                        <p className="text-xs text-slate-500">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 opacity-60">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Logged into Portal</p>
                                        <p className="text-xs text-slate-500">12 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <h2 className="text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest">Portal Access</h2>
                            <div className="space-y-4">
                                <p className="text-xs text-slate-500 leading-relaxed">Your session is secure and will expire in 1 week. Always logout if you are using a public computer.</p>
                                <hr className="border-slate-100 dark:border-slate-800" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Level</span>
                                    <span className="text-[10px] font-black text-blue-600 uppercase">Standard</span>
                                </div>
                            </div>
                        </section>

                        <Link
                            href="/"
                            className="w-full flex items-center justify-center gap-3 p-6 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-2xl shadow-slate-900/20"
                        >
                            Back to Library
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
