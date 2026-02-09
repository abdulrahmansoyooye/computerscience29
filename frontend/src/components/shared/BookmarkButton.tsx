"use client";

import { useBookmarks, BookmarkedItem } from "@/hooks/useBookmarks";
import { Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookmarkButtonProps {
    item: BookmarkedItem;
}

export default function BookmarkButton({ item }: BookmarkButtonProps) {
    const { toggleBookmark, isBookmarked, isLoaded } = useBookmarks();

    if (!isLoaded) return (
        <div className="w-16 h-16 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-200">
            <Bookmark size={24} strokeWidth={2.5} />
        </div>
    );

    const active = isBookmarked(item.id);

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleBookmark(item)}
            className={`w-16 h-16 rounded-[1.5rem] border-2 flex items-center justify-center transition-all relative ${active
                    ? "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-100 dark:border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500"
                }`}
        >
            <Bookmark size={24} strokeWidth={2.5} fill={active ? "currentColor" : "none"} />

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-blue-500/20 rounded-[1.5rem]"
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
}
