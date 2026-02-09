"use client";

import { useState, useEffect } from "react";

export interface BookmarkedItem {
    id: string;
    type: "material" | "announcement";
    title: string;
    slug: string;
    courseCode?: string;
    category?: string;
    date?: string;
}

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("csc29_bookmarks");
        if (saved) {
            try {
                setBookmarks(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse bookmarks", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const toggleBookmark = (item: BookmarkedItem) => {
        setBookmarks((prev) => {
            const exists = prev.find((b) => b.id === item.id);
            let nextBookmarks;
            if (exists) {
                nextBookmarks = prev.filter((b) => b.id !== item.id);
            } else {
                nextBookmarks = [...prev, item];
            }
            localStorage.setItem("csc29_bookmarks", JSON.stringify(nextBookmarks));
            return nextBookmarks;
        });
    };

    const isBookmarked = (id: string) => {
        return bookmarks.some((b) => b.id === id);
    };

    return { bookmarks, toggleBookmark, isBookmarked, isLoaded };
}
