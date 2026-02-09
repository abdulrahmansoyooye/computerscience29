"use client";

import { useState } from "react";
import { Search, LayoutGrid, Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CoursesContent({ initialCourses }: { initialCourses: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCourses = initialCourses.filter(c =>
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
            <header className="mb-16 space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
                    <LayoutGrid size={14} /> Academic Catalog
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                    Departmental <span className="text-slate-400 font-light">Courses.</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium">
                    Explore Computer Science courses across all levels. Access syllabus, reference materials, and expert-curated notes.
                </p>
            </header>

            <section className="mb-12 relative group max-w-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur opacity-75 group-focus-within:opacity-100 transition duration-500"></div>
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                    <input
                        type="text"
                        placeholder="Search by course code or title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all focus:border-blue-500 dark:focus:border-blue-400 font-bold shadow-xl shadow-slate-200/50 dark:shadow-none"
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course, idx) => (
                        <motion.div
                            layout
                            key={course.code}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 md:p-10 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start md:items-center gap-6">
                                    <div className="shrink-0 w-20 h-20 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col items-center justify-center font-black shadow-xl shadow-slate-900/10 dark:shadow-white/5 group-hover:scale-110 transition-transform duration-500">
                                        <span className="text-2xl">{course.code?.split(" ")?.[1] || "?"}</span>
                                        <span className="text-[10px] uppercase tracking-tighter opacity-70">CSC</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{course.code}</span>
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md flex items-center gap-1">
                                                <Clock size={10} /> {course.level?.name || "Level"}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {course.name}
                                        </h3>
                                    </div>
                                </div>

                                <Link
                                    href={`/materials?course=${course.code}`}
                                    className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-300 shadow-sm self-end md:self-auto"
                                >
                                    <ChevronRight size={28} strokeWidth={2.5} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredCourses.length === 0 && (
                <div className="py-20 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Courses Found</h3>
                    <p className="text-slate-500 dark:text-slate-400">Try searching for a different code or subject name.</p>
                </div>
            )}
        </main>
    );
}
