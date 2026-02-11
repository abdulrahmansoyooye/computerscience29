"use client";

import { Info, Calendar, ChevronRight, AlertCircle, CheckCircle2, Megaphone, Stars, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function AnnouncementsContent({ initialAnnouncements }: { initialAnnouncements: any[] }) {
    const { toggleBookmark, isBookmarked } = useBookmarks();
    // If we have no announcements, we can show some mock ones or an empty state
    const displayAnnouncements = initialAnnouncements.length > 0 ? initialAnnouncements : [];

    return (
        <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
            <header className="mb-16 space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
                    <Megaphone size={14} /> Official Broadcasts
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                            Latest <span className="text-slate-400 font-light">Notices.</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            Stay informed about exams, schedule changes, and departmental events.
                        </p>
                    </div>
                </div>
            </header>

            <div className="space-y-12">
                {displayAnnouncements.map((item, idx) => {
                    const active = isBookmarked(item._id);
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.type === 'warning' ? 'from-amber-600' :
                                item.type === 'success' ? 'from-emerald-600' : 'from-blue-600'
                                }`} />

                            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className={`w-20 h-20 rounded-[1.75rem] flex items-center justify-center shrink-0 shadow-lg ${item.type === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                                            item.type === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                                                'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                                            }`}>
                                            {item.type === 'warning' ? <AlertCircle size={36} strokeWidth={2.5} /> :
                                                item.type === 'success' ? <CheckCircle2 size={36} strokeWidth={2.5} /> :
                                                    <Info size={36} strokeWidth={2.5} />}
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => toggleBookmark({
                                                id: item._id,
                                                type: "announcement",
                                                title: item.title,
                                                slug: "announcements", // Just link to announcements page for now
                                                category: "NOTICE",
                                                date: item.date
                                            })}
                                            className={`p-3 rounded-2xl border transition-all ${active
                                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                                                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 hover:border-blue-500/50"
                                                }`}
                                        >
                                            <Bookmark size={18} fill={active ? "white" : "none"} />
                                        </motion.button>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                <Calendar size={14} /> {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${item.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30' :
                                                    item.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                                                        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
                                                    }`}>
                                                    {item.type?.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}


                {displayAnnouncements.length === 0 && (
                    <div className="py-20 text-center animate-fade-in bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Megaphone size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No active notices</h3>
                        <p className="text-slate-500 dark:text-slate-400">Things are quiet for now. Check back later for departmental updates.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
