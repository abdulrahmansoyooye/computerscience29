import { client } from "@/sanity/lib/client";
import { allCoursesQuery } from "@/sanity/lib/queries";
import Navbar from "@/components/layout/Navbar";
import { LayoutGrid, Search } from "lucide-react";
import CourseList from "@/components/courses/CourseList";

async function getCourses() {
    try {
        return await client.fetch(allCoursesQuery);
    } catch (err) {
        console.error("Failed to fetch courses:", err);
        return [];
    }
}

export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

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

                <CourseList initialCourses={courses} />
            </main>
        </div>
    );
}
