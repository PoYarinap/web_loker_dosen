import Link from 'next/link'
import { DATA_JURUSAN } from '@/lib/data'
import { Briefcase } from 'lucide-react'
import JurusanCard from '@/components/JurusanCard'
import Navbar from '@/components/Navbar'

export const metadata = {
    title: 'Daftar Jurusan Lowongan Dosen Terbaru 2026',
    description:
        'Pilih jurusan untuk melihat lowongan dosen terbaru di seluruh Indonesia berdasarkan bidang akademik.',
}

export default function LokerDosenPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />

            {/* Hero Header */}
            <header className="relative overflow-hidden bg-white dark:bg-slate-900/50 pt-24 pb-20 transition-colors">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-50/50 dark:bg-blue-900/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-indigo-50/30 dark:bg-indigo-900/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <div className="mb-8 flex flex-col items-center justify-center gap-6 md:flex-row">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-xl shadow-blue-100 dark:shadow-blue-900/20">
                            <Briefcase size={24} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
                            Daftar <span className="text-blue-600 dark:text-blue-400">Jurusan</span>
                        </h1>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                        Temukan kesempatan mengabdi dan berkarir di dunia akademik. <br className="hidden md:block" />
                        Pilih jurusan yang sesuai dengan kompetensi dan passion Anda.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {DATA_JURUSAN.map((jurusan) => (
                        <JurusanCard
                            key={jurusan.id}
                            name={jurusan.name}
                            slug={jurusan.slug}
                            thumbnail={jurusan.thumbnail}
                            description={jurusan.description}
                            count={jurusan.items.length}
                        />
                    ))}
                </div>
            </main>

            {/* CTA Section */}
            <section className="bg-white dark:bg-slate-950 py-24 transition-colors">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-blue-900 to-slate-950 p-12 text-center text-white shadow-2xl shadow-blue-900/20 border border-white/5">
                        {/* Decorative Blobs */}
                        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
                        
                        <div className="relative z-10">
                            <h2 className="mb-6 text-3xl font-black md:text-5xl tracking-tight">
                                Hubungi <span className="text-blue-300">Tim Kami</span>
                            </h2>
                            <p className="mx-auto mb-10 max-w-xl text-blue-100 text-lg font-medium leading-relaxed opacity-90">
                                Memiliki pertanyaan atau ingin bekerja sama memasang
                                lowongan dosen? Kami siap membantu anda.
                            </p>
                            <Link 
                                href="/tentang-kami"
                                className="inline-block rounded-full bg-white px-12 py-4 font-black text-blue-900 transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-2xl active:scale-95"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12 transition-colors">
                <div className="mx-auto max-w-7xl px-6 text-center text-slate-500 dark:text-slate-400">
                    <p>© 2026 Web Loker Dosen. Seluruh hak cipta dilindungi.</p>
                </div>
            </footer>
        </div>
    )
}
