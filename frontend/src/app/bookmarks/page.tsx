"use client";

import Navbar from "@/components/layout/Navbar";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Bookmark, FileText, ArrowRight, Trash2, Clock, Calendar, GraduationCap, Inbox } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function BookmarksPage() {
    const { bookmarks, toggleBookmark, isLoaded } = useBookmarks();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <header className="mb-16 space-y-6">
                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/10 w-fit px-4 py-2 rounded-full border border-blue-100 dark:border-blue-900/20">
                        <Bookmark size={14} fill="currentColor" /> Saved for later
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                            Your <span className="text-slate-400 font-light">Collection.</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                            A curated list of your bookmarked study materials and resources. Syncs automatically with your local browser.
                        </p>
                    </div>
                </header>

                <div className="space-y-6">
                    {!isLoaded ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-48 rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
                            ))}
                        </div>
                    ) : bookmarks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatePresence mode="popLayout">
                                {bookmarks.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group relative"
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />

                                        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm group-hover:shadow-2xl transition-all duration-300">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                    <FileText size={28} strokeWidth={2.5} />
                                                </div>

                                                <button
                                                    onClick={() => toggleBookmark(item)}
                                                    className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                                                        {item.courseCode || "CSC"}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                                                        {item.category || "MATERIAL"}
                                                    </span>
                                                </div>

                                                <Link href={`/materials/${item.slug}`} className="block group/title">
                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                </Link>

                                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 opacity-60">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                                                        <Calendar size={12} />
                                                        Saved on {new Date(item.date || Date.now()).toLocaleDateString()}
                                                    </div>
                                                    <Link
                                                        href={`/materials/${item.slug}`}
                                                        className="flex items-center gap-2 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:translate-x-1 transition-transform"
                                                    >
                                                        Read Now <ArrowRight size={14} strokeWidth={3} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="py-32 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                        >
                            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                                <Bookmark size={40} className="text-slate-200" />
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white border-4 border-white dark:border-slate-900">
                                    <Inbox size={20} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Vault is empty</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 text-lg font-medium">
                                You haven't bookmarked any materials yet. Head to the library to start building your collection.
                            </p>
                            <Link href="/materials" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-xl">
                                Browse Library <ArrowRight size={20} strokeWidth={2.5} />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </main>

            <footer className="py-20 text-center opacity-40">
                <div className="flex items-center justify-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <GraduationCap size={16} /> CSC29 ACADEMIC VAULT
                </div>
            </footer>
        </div>
    );
}
