"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MaterialCard from "@/components/shared/MaterialCard";
import { Search, Filter, BookOpen, GraduationCap, X, SlidersHorizontal, Layers, LayoutGrid, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { allMaterialsQuery } from "@/sanity/lib/queries";

export default function MaterialsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [materials, setMaterials] = useState<any[]>([]);
    const [filteredMaterials, setFilteredMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await client.fetch(allMaterialsQuery);
                setMaterials(data || []);
                setFilteredMaterials(data || []);
            } catch (err) {
                console.error("Sanity fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = materials.filter(item => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.course?.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.course?.name?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesLevel = selectedLevel === "All" || item.level?.name === selectedLevel;
            const matchesCategory = selectedCategory === "All" || item.category?.name === selectedCategory;

            return matchesSearch && matchesLevel && matchesCategory;
        });
        setFilteredMaterials(filtered);
    }, [searchTerm, selectedLevel, selectedCategory, materials]);

    const levels = ["All", "100 Level", "200 Level", "300 Level", "400 Level"];
    const categories = ["All", "Lecture Notes", "Past Questions", "Lab Manuals", "Slides", "Textbooks"];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <header className="mb-16 space-y-4">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
                        <Layers size={14} /> Knowledge Hub
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                        The Digital <span className="text-slate-400 font-light">Library.</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium">
                        Access, search, and download all Computer Science academic materials in one unified platform.
                    </p>
                </header>

                {/* Search and Filters Bar */}
                <section className="sticky top-16 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl mb-12 py-6 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        {/* Search Input */}
                        <div className="flex-1 w-full relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by title, course code, or topic..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-14 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
                                    >
                                        <X size={14} strokeWidth={3} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Dropdown Filters */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto">
                            <div className="flex-1 lg:min-w-[180px]">
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <GraduationCap size={16} />
                                    </div>
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none text-slate-900 dark:text-white text-sm font-black uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                                    >
                                        {levels.map(l => <option key={l} value={l}>{l === "All" ? "ALL LEVELS" : l.toUpperCase()}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="flex-1 lg:min-w-[200px]">
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <Filter size={16} />
                                    </div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none text-slate-900 dark:text-white text-sm font-black uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c === "All" ? "ALL CATEGORIES" : c.toUpperCase()}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Grid */}
                <div className="min-h-[500px]">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="h-80 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900/50 animate-pulse border border-slate-200/50 dark:border-slate-800/50"
                                />
                            ))}
                        </div>
                    ) : filteredMaterials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            <AnimatePresence mode="popLayout">
                                {filteredMaterials.map((item, idx) => (
                                    <MaterialCard key={item._id || idx} material={item} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-32 text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-8 text-slate-300">
                                <Search size={48} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">No matching results</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 font-medium text-lg leading-relaxed">
                                We couldn't find any materials matching your current filters. Try relaxing your search criteria.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { setSearchTerm(""); setSelectedLevel("All"); setSelectedCategory("All"); }}
                                className="px-10 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black tracking-widest text-sm uppercase shadow-xl"
                            >
                                Reset All Filters
                            </motion.button>
                        </motion.div>
                    )}
                </div>

                {/* Stats footer hint */}
                {!loading && filteredMaterials.length > 0 && (
                    <div className="mt-20 flex items-center justify-center gap-4 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
                        Showing {filteredMaterials.length} unique resources
                        <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
                    </div>
                )}
            </main>
        </div>
    );
}
