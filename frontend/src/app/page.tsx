import { client } from "@/sanity/lib/client";
import { allMaterialsQuery, featuredMaterialsQuery } from "@/sanity/lib/queries";
import Navbar from "@/components/layout/Navbar";
import MaterialCard from "@/components/shared/MaterialCard";
import { Book, Stars, ArrowRight, Filter, Bookmark, GraduationCap, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { getUser } from "@/lib/auth";


async function getMaterials() {
  return await client.fetch(allMaterialsQuery);
}

async function getFeaturedMaterials() {
  return await client.fetch(featuredMaterialsQuery);
}

export default async function Home() {
  let materials = [];
  let featured = [];
  const user = await getUser();

  try {
    materials = await getMaterials();
    featured = await getFeaturedMaterials();
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16 md:space-y-24">
        {/* Welcome Section (for logged in users) */}
        {user && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                Welcome back, {user.split('/').pop()}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-1">
                Ready to continue your learning journey today?
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full w-fit">
              <Zap size={14} className="animate-pulse" /> Final Year Exam Countdown: 45 Days
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 text-white p-8 md:p-20 border border-white/10 shadow-2xl">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[130px]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[130px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                  <Stars size={14} className="text-amber-400 fill-amber-400" />
                  Your Digital Academic Vault
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
                  Modern Learning <br />
                  <span className="text-blue-400">Simplified.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                  The ultimate repository for CSC29 students. High-quality lecture notes, past exams, and exclusive resources in one beautiful place.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/materials" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-900 font-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl">
                    Explore Library <ArrowRight size={20} />
                  </Link>
                  <div className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white tracking-wide">TRUSTED BY</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase">500+ CSC Students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats / Visual element for desktop */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                  <StatCard icon={<Book size={20} />} label="Total Materials" value="120+" color="bg-blue-500" />
                  <StatCard icon={<GraduationCap size={20} />} label="Active Courses" value="14" color="bg-indigo-500" />
                </div>
                <div className="space-y-4">
                  <StatCard icon={<Bookmark size={20} />} label="Saved Resources" value="4.5k" color="bg-emerald-500" />
                  <StatCard icon={<Clock size={20} />} label="Avg. Study Time" value="2h/d" color="bg-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Materials */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                Latest Updates
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Recently Added <span className="text-slate-400 font-light">Library</span>
              </h2>
            </div>
            <Link href="/materials" className="group text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-6 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all w-fit">
              Browse Everything <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {materials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all">
              {materials.slice(0, 6).map((item: any, idx: number) => (
                <MaterialCard key={idx} material={item} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        {/* Quick Links / Navigation Categories */}
        <section className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-16 border border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">What are you looking for?</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Quickly navigate to the most popular sections of our repository.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <QuickLink href="/courses" label="Courses" count="14" color="bg-blue-500" />
              <QuickLink href="/materials?category=notes" label="Lecture Notes" count="45" color="bg-indigo-500" />
              <QuickLink href="/materials?category=past-questions" label="Exam Papers" count="32" color="bg-emerald-500" />
              <QuickLink href="/announcements" label="Announcements" count="12" color="bg-amber-500" />
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-900 dark:text-white font-bold text-2xl tracking-tighter">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                <GraduationCap size={20} />
              </div>
              CSC29 Portal
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto md:mx-0">
              The official resource material portal for Computer Science students, Class of 29.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="/courses" className="hover:text-blue-500 transition-colors">Course List</Link></li>
                <li><Link href="/materials" className="hover:text-blue-500 transition-colors">Study Planner</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Contact Rep</Link></li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white">Stay Updated</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Get the latest news directly in your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-100 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} CSC29 Portal &bull; Crafted by Antigravity
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/15 transition-all">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function QuickLink({ href, label, count, color }: { href: string, label: string, count: string, color: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-4 group">
      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.75rem] ${color} text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500`}>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{label}</p>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{count} Files</span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-12 md:p-24 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-slate-400">
        <Filter size={40} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">The Library is Quiet...</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium">
        We haven't uploaded any materials yet. Check back soon or contact your course representatives.
      </p>
      <button className="px-10 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">
        Notify Me
      </button>
    </div>
  );
}

