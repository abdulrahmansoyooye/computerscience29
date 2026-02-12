import { client } from "@/sanity/lib/client";
import { materialBySlugQuery } from "@/sanity/lib/queries";
import Navbar from "@/components/layout/Navbar";
import { ChevronLeft, Download, Bookmark, Share2, Clock, Calendar, BookOpen, ExternalLink, Shield, FileText, Sparkles, User, Info, Zap } from "lucide-react";
import Link from "next/link";
import PortableText from "react-portable-text";
import { notFound } from "next/navigation";
import BookmarkButton from "@/components/shared/BookmarkButton";
import { format } from "date-fns";

async function getMaterial(slug: string) {
    return await client.fetch(materialBySlugQuery, { slug });
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const material = await getMaterial(slug);

    if (!material) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <Link
                    href="/materials"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all font-bold uppercase tracking-widest text-[10px] mb-12 group"
                >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-all">
                        <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Back to Library
                </Link>

                {/* Header / Hero Section for Material */}
                <div className="relative mb-16">
                    <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

                    <div className="space-y-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10">
                                {material.course?.code || "COURSE"}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-900/30">
                                {material.category?.name || "UNCLASSIFIED"}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-900/30">
                                {material.level?.name || "ALL LEVELS"}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight max-w-4xl">
                                {material.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-blue-500" />
                                    Last Updated: {format(new Date(material._createdAt), 'MMM d, yyyy')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen size={14} className="text-indigo-500" />
                                    {material.semester?.name || "Semester 1"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-emerald-500" />
                                    By CSC29 Reps
                                </div>
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl">
                            {material.description || "A detailed study resource for the Department of Computer Science students."}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            {material.fileUrl ? (
                                <a
                                    href={material.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black tracking-widest uppercase hover:scale-105 transition-all shadow-2xl active:scale-95 group"
                                >
                                    <Download size={20} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                                    Download Material
                                </a>
                            ) : (
                                <div className="px-10 py-5 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-400 font-black tracking-widest uppercase flex items-center gap-3">
                                    <Info size={20} />
                                    No File Attached
                                </div>
                            )}

                            {material.externalLink && (
                                <a
                                    href={material.externalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-8 py-5 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-black tracking-widest uppercase hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                                >
                                    <ExternalLink size={20} strokeWidth={2.5} />
                                    Open Link
                                </a>
                            )}

                            <BookmarkButton
                                item={{
                                    id: material._id,
                                    type: "material",
                                    title: material.title,
                                    slug: material.slug.current,
                                    courseCode: material.course?.code,
                                    category: material.category?.name,
                                    date: material._createdAt
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Reading Zone */}
                        <div className="relative">
                            <div className="absolute -left-12 top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />

                            {material.content ? (
                                <article className="prose prose-slate dark:prose-invert max-w-none">
                                    <PortableText
                                        content={material.content}
                                        serializers={{
                                            h1: (props: any) => <h2 className="text-3xl font-black mb-8 mt-12 text-slate-900 dark:text-white tracking-tight" {...props} />,
                                            h2: (props: any) => <h3 className="text-2xl font-black mb-6 mt-10 text-slate-900 dark:text-white tracking-tight" {...props} />,
                                            h3: (props: any) => <h4 className="text-xl font-bold mb-4 mt-8 text-slate-900 dark:text-white" {...props} />,
                                            normal: (props: any) => (
                                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-[1.8] text-lg font-medium" {...props} />
                                            ),
                                            ul: (props: any) => <ul className="space-y-3 mb-8 list-disc pl-6 text-slate-600 dark:text-slate-400 font-medium" {...props} />,
                                            ol: (props: any) => <ol className="space-y-3 mb-8 list-decimal pl-6 text-slate-600 dark:text-slate-400 font-medium" {...props} />,
                                            li: (props: any) => <li className="pl-2" {...props} />,
                                            code: ({ language, code }: any) => (
                                                <div className="my-10 group relative">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                                        <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex justify-between items-center">
                                                            <span className="flex items-center gap-2"><Sparkles size={12} className="text-blue-500" /> {language || 'source code'}</span>
                                                            <button
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(code);
                                                                }}
                                                                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                                                            >
                                                                COPY CODE
                                                            </button>
                                                        </div>
                                                        <pre className="p-8 bg-slate-950 text-slate-200 overflow-x-auto font-mono text-sm leading-relaxed">
                                                            <code>{code}</code>
                                                        </pre>
                                                    </div>
                                                </div>
                                            ),
                                        }}
                                    />
                                </article>
                            ) : (
                                <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FileText size={32} className="text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm">Digital content not available</p>
                                    <p className="text-slate-400 text-xs mt-2 uppercase tracking-tighter">Please download the PDF for full details</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Metadata */}
                    <div className="space-y-8">
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 space-y-8">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Course Metrics</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Popularity</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 4 ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`} />)}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Difficulty</span>
                                        <span className="text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded">Moderate</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Est. Reading</span>
                                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">15 mins</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 dark:bg-slate-800" />

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                                <Shield size={24} className="text-blue-500 mt-1 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-tight text-slate-900 dark:text-white leading-none">Verified Material</p>
                                    <p className="text-[10px] font-bold text-slate-500 leading-tight uppercase tracking-tighter">Content reviewed and approved by CSC29 Course Reps.</p>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black tracking-[0.2em] uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                <Share2 size={16} /> Share Resource
                            </button>
                        </div>

                        {/* Course Shortcut */}
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                <Zap size={24} fill="white" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-xl font-black leading-tight">Explore the full <br />{material.course?.code} Track</h4>
                                <p className="text-white/70 text-sm font-medium">Access all resources related to this course in one click.</p>
                            </div>
                            <Link href={`/materials?course=${material.course?.code}`} className="block w-full py-4 rounded-2xl bg-white text-blue-600 text-center text-xs font-black tracking-widest uppercase hover:scale-105 transition-transform active:scale-95">
                                View Course Rack
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
