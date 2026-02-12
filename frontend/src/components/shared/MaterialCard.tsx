"use client";

import { useBookmarks } from "@/hooks/useBookmarks";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { FileText, Clock, Tag, ChevronRight, Bookmark } from "lucide-react";

interface MaterialCardProps {
    material: {
        _id: string;
        title: string;
        slug: { current: string };
        course: { name: string; code: string };
        category: { name: string };
        level: { name: string };
        description?: string;
        _createdAt: string;
    };
}

export default function MaterialCard({ material }: MaterialCardProps) {
    const { toggleBookmark, isBookmarked } = useBookmarks();
    const active = isBookmarked(material._id);

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark({
            id: material._id,
            type: "material",
            title: material.title,
            slug: material.slug.current,
            courseCode: material.course?.code || "N/A",
            category: material.category?.name || "Uncategorized",
            date: material._createdAt
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
        >
            {/* Background Glow Effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10 dark:shadow-white/5 transition-transform duration-300"
                    >
                        <FileText size={24} strokeWidth={2.5} />
                    </motion.div>

                    <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                            {material.course?.code || "N/A"}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
                            {material.category?.name || "General"}
                        </span>
                    </div>
                </div>

                <Link href={`/materials/${material.slug.current}`}>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight tracking-tight">
                        {material.title}
                    </h3>
                </Link>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed font-medium">
                    {material.description || `Comprehensive study material for ${material.course.name}. Includes detailed notes and reference guides.`}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} className="text-slate-300 dark:text-slate-600" />
                            {format(new Date(material._createdAt), "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Tag size={12} className="text-slate-300 dark:text-slate-600" />
                            {material.level?.name || "All Levels"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleBookmark}
                            className={`p-2 transition-colors relative ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 hover:text-blue-500 dark:text-slate-600 dark:hover:text-blue-400'}`}
                        >
                            <Bookmark size={18} fill={active ? "currentColor" : "none"} />
                            <AnimatePresence>
                                {active && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-blue-500/20 rounded-full"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.button>
                        <Link
                            href={`/materials/${material.slug.current}`}
                            className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

