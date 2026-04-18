import { DATA_JURUSAN } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
    MapPin,
    Calendar,
    Clock,
    ChevronRight,
    CheckCircle2,
    Mail,
    ArrowLeft,
} from 'lucide-react'
import Navbar from '@/components/Navbar'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ jurusan: string; slug: string }>
}) {
    const { jurusan: jurusanSlug, slug: jobSlug } = await params
    const jurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug)
    const job = jurusan?.items.find((item) => item.slug === jobSlug)

    if (!job) return { title: 'Lowongan Tidak Ditemukan' }

    return {
        title: job.title,
        description: job.description,
    }
}

export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ jurusan: string; slug: string }>
}) {
    const { jurusan: jurusanSlug, slug: jobSlug } = await params
    const jurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug)
    const job = jurusan?.items.find((item) => item.slug === jobSlug)

    if (!job) {
        notFound()
    }

    // JSON-LD for JobPosting
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        employmentType: 'FULL_TIME',
        datePosted: `${job.tahun}-04-01`,
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.daerah,
                addressCountry: 'ID',
            },
        },
        hiringOrganization: {
            '@type': 'Organization',
            name: job.university,
        },
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Link
                            href={`/loker-dosen/${jurusanSlug}`}
                            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                        >
                            <ArrowLeft size={16} /> Kembali ke Daftar Lowongan{' '}
                            {jurusan?.name}
                        </Link>

                        <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-3xl shadow-lg">
                            <Image
                                src={job.thumbnail}
                                alt={job.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h1 className="mb-6 text-2xl font-black leading-tight text-slate-900 dark:text-white md:text-4xl">
                            {job.title}
                        </h1>

                        <div className="mb-10 flex flex-wrap gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-2 rounded-full bg-slate-50 dark:bg-slate-900 px-4 py-2 border dark:border-slate-800">
                                <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
                                {job.daerah}
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-slate-50 dark:bg-slate-900 px-4 py-2 border dark:border-slate-800">
                                <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                                {job.bulan} {job.tahun}
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-slate-50 dark:bg-slate-900 px-4 py-2 border dark:border-slate-800">
                                <Clock size={18} className="text-blue-600 dark:text-blue-400" />
                                Full Time
                            </div>
                        </div>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                Deskripsi Pekerjaan
                            </h2>
                            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                                {job.description}
                            </p>

                            <div className="my-12 h-px bg-slate-100 dark:bg-slate-800" />

                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                Kualifikasi Pelamar
                            </h2>
                            <p className="mb-6 text-lg text-slate-600 dark:text-slate-300">
                                {job.qualificationIntro}
                            </p>
                            <ul className="space-y-4">
                                {job.qualifications.map((q, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-lg text-slate-600 dark:text-slate-300"
                                    >
                                        <CheckCircle2
                                            size={24}
                                            className="mt-0.5 shrink-0 text-green-500 dark:text-green-400"
                                        />
                                        {q}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar / Apply */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 rounded-[2.5rem] border border-slate-100/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center shadow-2xl shadow-blue-600/5 dark:shadow-black/40">
                            <h3 className="mb-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                Tertarik melamar?
                            </h3>
                            <p className="mb-10 text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                Pastikan Anda memenuhi semua kualifikasi sebelum
                                mengirimkan berkas lamaran Anda.
                            </p>
                            <Link
                                href={`/loker-dosen/${jurusanSlug}/${jobSlug}/lamaran`}
                                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-900 px-6 py-4 text-center font-black text-white shadow-xl shadow-blue-900/10 transition-all hover:bg-blue-800 hover:-translate-y-1 active:scale-95"
                            >
                                Kirim Lamaran Sekarang <ChevronRight size={20} />
                            </Link>

                            <div className="mt-12 flex flex-col items-center gap-6">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-inner">
                                    <Mail size={24} />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        Email Instansi
                                    </div>
                                    <div className="text-lg font-black text-slate-900 dark:text-white">
                                        {job.applyEmail}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-24 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12 transition-colors">
                <div className="mx-auto max-w-7xl px-6 text-center text-slate-500 dark:text-slate-400">
                    <p>© 2026 Web Loker Dosen. Seluruh hak cipta dilindungi.</p>
                </div>
            </footer>
        </div>
    )
}
