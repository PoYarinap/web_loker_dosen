'use client'

import {
    Search,
    MapPin,
    ArrowRight,
    Briefcase,
    School,
    Users,
    LibraryBig,
    X,
} from 'lucide-react'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DATA_JURUSAN } from '@/lib/data'
import JurusanCard from '@/components/JurusanCard'
import Navbar from '@/components/Navbar'

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [locationQuery, setLocationQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    // Flatten all jobs into a single list for searching
    const allJobs = useMemo(() => {
        return DATA_JURUSAN.flatMap((jurusan) =>
            jurusan.items.map((item) => ({
                ...item,
                jurusanName: jurusan.name,
            }))
        )
    }, [])

    // Filter jobs based on both queries
    const filteredJobs = useMemo(() => {
        if (!searchQuery && !locationQuery) return []

        return allJobs.filter((job) => {
            const matchesSearch =
                !searchQuery ||
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.university
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                job.jurusanName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())

            const matchesLocation =
                !locationQuery ||
                job.daerah.toLowerCase().includes(locationQuery.toLowerCase())

            return matchesSearch && matchesLocation
        })
    }, [searchQuery, locationQuery, allJobs])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)
    }

    const clearSearch = () => {
        setSearchQuery('')
        setLocationQuery('')
        setIsSearching(false)
    }

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 pt-10 pb-20 lg:pt-16 lg:pb-32 transition-colors">
                <div className="absolute inset-0 z-0 opacity-15">
                    <Image
                        src="/img/hero.png"
                        alt="Hero Background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-8 inline-flex items-center rounded-full bg-linear-to-r from-blue-800 to-indigo-950 px-6 py-2 shadow-md">
                            <span className="text-sm font-bold uppercase tracking-widest text-white">
                                1 Portal Karir Akademik di Indonesia
                            </span>
                        </div>
                        <h1 className="mb-8 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
                            Temukan Karir{' '}
                            <span className="text-blue-600 dark:text-blue-400">
                                Dosen
                            </span>{' '}
                            Impian Anda di Sini.
                        </h1>
                        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
                            Platform terpercaya untuk menemukan lowongan dosen
                            tetap, tidak tetap, dan praktisi di universitas
                            terbaik seluruh Indonesia.
                        </p>

                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 p-2 shadow-2xl shadow-blue-100 dark:shadow-blue-900/20 md:rounded-full border dark:border-slate-800 transition-all"
                        >
                            <div className="flex flex-col gap-2 md:flex-row">
                                <div className="relative flex-1">
                                    <Search
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Jurusan atau Universitas..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full rounded-full border-none px-12 py-4 text-slate-900 dark:text-white bg-transparent focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <div className="relative flex-1 border-slate-100 dark:border-slate-800 md:border-l">
                                    <MapPin
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Lokasi Kota..."
                                        value={locationQuery}
                                        onChange={(e) =>
                                            setLocationQuery(e.target.value)
                                        }
                                        className="w-full rounded-full border-none px-12 py-4 text-slate-900 dark:text-white bg-transparent focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-full bg-blue-600 px-10 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
                                >
                                    Cari Lowongan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Results or Categories */}
            {isSearching || searchQuery || locationQuery ? (
                <section className="mx-auto max-w-7xl px-6 py-24">
                    <div className="mb-12 flex items-center justify-between border-b pb-6 dark:border-slate-800">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                                Hasil Pencarian
                            </h2>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Menampilkan {filteredJobs.length} lowongan yang
                                sesuai.
                            </p>
                        </div>
                        <button
                            onClick={clearSearch}
                            className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-2 font-bold text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                            <X size={18} /> Bersihkan Filter
                        </button>
                    </div>

                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredJobs.map((job) => (
                                <Link
                                    key={job.id}
                                    href={`/loker-dosen/${job.jurusan}/${job.slug}`}
                                    className="group overflow-hidden card-premium hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={job.thumbnail}
                                            alt={job.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 rounded-full bg-white/90 dark:bg-slate-900/90 px-4 py-1 text-xs font-black text-blue-600 shadow-sm backdrop-blur-sm">
                                            {job.daerah}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-500">
                                            {job.university}
                                        </div>
                                        <h3 className="mb-4 text-xl font-black text-slate-900 dark:text-white leading-tight transition-colors group-hover:text-blue-600">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-5">
                                            <span className="text-sm font-bold text-slate-400">
                                                {job.bulan} {job.tahun}
                                            </span>
                                            <span className="flex items-center gap-1 text-sm font-black text-blue-600 dark:text-blue-400">
                                                Detail <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-6 rounded-full bg-slate-50 dark:bg-slate-900 p-10 text-slate-300 dark:text-slate-800">
                                <Search size={80} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                Tidak ada hasil ditemukan
                            </h3>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Coba gunakan kata kunci lain atau bersihkan
                                filter.
                            </p>
                        </div>
                    )}
                </section>
            ) : (
                <>
                    {/* Stats Section */}
                    <section className="relative mx-auto -mt-16 max-w-6xl px-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            {[
                                {
                                    label: 'Loker Aktif',
                                    value: '1,250+',
                                    icon: (
                                        <Briefcase
                                            className="text-blue-600"
                                            size={24}
                                        />
                                    ),
                                    color: 'bg-blue-50',
                                },
                                {
                                    label: 'Universitas',
                                    value: '300+',
                                    icon: (
                                        <School
                                            className="text-purple-600"
                                            size={24}
                                        />
                                    ),
                                    color: 'bg-purple-50',
                                },
                                {
                                    label: 'Pendaftar',
                                    value: '25k+',
                                    icon: (
                                        <Users
                                            className="text-emerald-600"
                                            size={24}
                                        />
                                    ),
                                    color: 'bg-emerald-50',
                                },
                                {
                                    label: 'Jurusan',
                                    value: '80+',
                                    icon: (
                                        <LibraryBig
                                            className="text-orange-600"
                                            size={24}
                                        />
                                    ),
                                    color: 'bg-orange-50',
                                },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="stat-card group"
                                >
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.color} dark:bg-slate-800 transition-transform group-hover:scale-110`}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm font-bold text-slate-400">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Categories */}
                    <section
                        id="categories"
                        className="mx-auto max-w-7xl px-6 py-24"
                    >
                        <div className="mb-16 flex flex-col items-center justify-between md:flex-row">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
                                    Cari Berdasarkan Jurusan
                                </h2>
                                <p className="mt-2 text-slate-500 dark:text-slate-400">
                                    Pilih spesialisasi yang sesuai dengan bidang
                                    akademik Anda.
                                </p>
                            </div>
                            <Link
                                href="/loker-dosen"
                                className="group mt-4 flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline md:mt-0"
                            >
                                Lihat Semua Jurusan{' '}
                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>

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
                    </section>
                </>
            )}

            {/* Footer */}
            <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12 transition-colors">
                <div className="mx-auto max-w-7xl px-6 text-center text-slate-500 dark:text-slate-400">
                    <p>© 2026 Web Loker Dosen. Seluruh hak cipta dilindungi.</p>
                </div>
            </footer>
        </div>
    )
}
