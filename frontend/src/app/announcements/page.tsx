import { client } from "@/sanity/lib/client";
import { allAnnouncementsQuery } from "@/sanity/lib/queries";
import Navbar from "@/components/layout/Navbar";
import AnnouncementsContent from "@/components/shared/AnnouncementsContent";

async function getAnnouncements() {
    try {
        return await client.fetch(allAnnouncementsQuery);
    } catch (err) {
        console.error("Sanity fetch error:", err);
        return [];
    }
}

export default async function AnnouncementsPage() {
    const announcements = await getAnnouncements();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />
            <AnnouncementsContent initialAnnouncements={announcements} />
        </div>
    );
}
