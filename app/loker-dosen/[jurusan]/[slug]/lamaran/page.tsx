'use client'

import { use, useState } from 'react'
import { DATA_JURUSAN } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function ApplicationFormPage({
    params,
}: {
    params: Promise<{ jurusan: string; slug: string }>
}) {
    const { jurusan: jurusanSlug, slug: jobSlug } = use(params)
    const jurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug)
    const job = jurusan?.items.find((item) => item.slug === jobSlug)

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        whatsapp: '',
        pendidikan: '',
        jurusanPelamar: '',
        domisili: '',
        pengalaman: '',
        kualifikasiS2: 'Ya',
        siapDitempatkan: 'Ya',
    })

    if (!job) {
        notFound()
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        
        if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi"
        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format email tidak valid"
        }
        if (!formData.whatsapp.trim()) newErrors.whatsapp = "Nomor WhatsApp wajib diisi"
        if (!formData.domisili.trim()) newErrors.domisili = "Domisili wajib diisi"
        if (!formData.pendidikan) newErrors.pendidikan = "Pilih jenjang pendidikan"
        if (!formData.jurusanPelamar.trim()) newErrors.jurusanPelamar = "Jurusan pendidikan wajib diisi"
        if (!formData.pengalaman.trim()) newErrors.pengalaman = "Ceritakan singkat pengalaman Anda"
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) {
            // Scroll to first error
            const firstError = Object.keys(errors)[0]
            const element = document.getElementsByName(firstError)[0]
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            return
        }

        setIsSaving(true)

        try {
            // In a real app, replace the URL below with your actual Google Apps Script URL
            const scriptURL = process.env.NEXT_PUBLIC_SPREADSHEET_URL || ''

            if (scriptURL) {
                await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors', // Required for Google Apps Script Web Apps if not handling CORS
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        posisiDilamar: job.title,
                    }),
                })
            }

            console.log('Data sent to script. Proceeding to mailto...')
        } catch (error) {
            console.error('Error saving to spreadsheet:', error)
            // We continue to mailto anyway so user doesn't get stuck
        }

        // Generate mailto
        const subject = encodeURIComponent(`Lamaran: ${job.title}`)
        const body = encodeURIComponent(
            `Nama: ${formData.nama}\n` +
                `Email: ${formData.email}\n` +
                `WhatsApp: ${formData.whatsapp}\n` +
                `Pendidikan: ${formData.pendidikan}\n` +
                `Jurusan: ${formData.jurusanPelamar}\n` +
                `Domisili: ${formData.domisili}\n` +
                `Pengalaman Mengajar: ${formData.pengalaman}\n` +
                `Memiliki Gelar S2: ${formData.kualifikasiS2}\n` +
                `Siap Ditempatkan: ${formData.siapDitempatkan}\n\n` +
                `Posisi Dilamar: ${job.title}`
        )

        const mailto = `mailto:${job.applyEmail}?subject=${subject}&body=${body}`

        setIsSaving(false)
        setIsSubmitted(true)

        // Redirect after a short delay to show success state
        setTimeout(() => {
            window.location.href = mailto
        }, 1500)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
                <Navbar />
                <main className="flex flex-col items-center justify-center px-6 py-24 text-center">
                    <div className="w-full max-w-xl rounded-4xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 shadow-2xl shadow-slate-200 dark:shadow-black/40">
                        <div className="mb-8 flex justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-green-50 dark:bg-green-900/10 text-green-500 dark:text-green-400 shadow-inner">
                                <CheckCircle2 size={56} strokeWidth={2.5} />
                            </div>
                        </div>
                        <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Data Berhasil Disimpan!
                        </h1>
                        <p className="mb-10 text-lg leading-relaxed text-slate-500">
                            Sistem kami telah merekam data Anda. <br />
                            Membuka aplikasi email untuk mengirim berkas
                            resmi...
                        </p>
                        <div className="mb-12 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div className="h-full w-full animate-progress bg-blue-600 dark:bg-blue-400 rounded-full" />
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 font-bold text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={18} /> Kembali ke Beranda
                        </Link>
                    </div>
                </main>
                <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12 transition-colors">
                    <div className="mx-auto max-w-7xl px-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                        <p>
                            © 2026 Web Loker Dosen. Seluruh hak cipta
                            dilindungi.
                        </p>
                    </div>
                </footer>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />

            <main className="mx-auto max-w-3xl px-6 py-12">
                <Link
                    href={`/loker-dosen/${jurusanSlug}/${jobSlug}`}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                    <ArrowLeft size={16} /> Kembali ke Detail Lowongan
                </Link>

                <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-transparent dark:border-slate-800 md:p-12 transition-all">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                            Formulir Lamaran
                        </h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Lengkapi data diri Anda untuk melamar sebagai{' '}
                            <strong>Dosen {jurusan?.name}</strong> di{' '}
                            {job.daerah}.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="text-sm font-black tracking-wide text-slate-700 dark:text-slate-300 ml-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Masukkan nama sesuai KTP"
                                    className={`w-full rounded-2xl border bg-slate-50/50 dark:bg-slate-950 px-5 py-4 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium ${
                                        errors.nama 
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" 
                                        : "border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/5"
                                    }`}
                                />
                                {errors.nama && (
                                    <p className="text-xs font-bold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {errors.nama}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black tracking-wide text-slate-700 dark:text-slate-300 ml-1">
                                    Email Aktif
                                </label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="name@gmail.com"
                                    className={`w-full rounded-2xl border bg-slate-50/50 dark:bg-slate-950 px-5 py-4 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium ${
                                        errors.email 
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" 
                                        : "border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/5"
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-xs font-bold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="text-sm font-black tracking-wide text-slate-700 dark:text-slate-300 ml-1">
                                    Nomor WhatsApp
                                </label>
                                <input
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    type="tel"
                                    placeholder="0812..."
                                    className={`w-full rounded-2xl border bg-slate-50/50 dark:bg-slate-950 px-5 py-4 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium ${
                                        errors.whatsapp 
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" 
                                        : "border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/5"
                                    }`}
                                />
                                {errors.whatsapp && (
                                    <p className="text-xs font-bold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {errors.whatsapp}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black tracking-wide text-slate-700 dark:text-slate-300 ml-1">
                                    Domisili Saat Ini
                                </label>
                                <input
                                    name="domisili"
                                    value={formData.domisili}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Kota tempat tinggal"
                                    className={`w-full rounded-2xl border bg-slate-50/50 dark:bg-slate-950 px-5 py-4 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium ${
                                        errors.domisili 
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" 
                                        : "border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/5"
                                    }`}
                                />
                                {errors.domisili && (
                                    <p className="text-xs font-bold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {errors.domisili}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black tracking-wide text-slate-700 dark:text-slate-300 ml-1">
                                Pendidikan Terakhir
                            </label>
                            <div className={`grid grid-cols-1 gap-3 sm:grid-cols-3 rounded-2xl transition-all ${errors.pendidikan ? "p-3 border border-red-500 bg-red-50/30 dark:bg-red-950/10" : ""}`}>
                                {[
                                    { id: 'S2', label: 'Magister (S2)' },
                                    { id: 'S3', label: 'Doktor (S3)' },
                                    { id: 'Profesi', label: 'Profesi/Spesialis' }
                                ].map((edu) => (
                                    <label 
                                        key={edu.id} 
                                        className={`flex cursor-pointer items-center justify-center rounded-2xl border py-4 transition-all hover:scale-[1.02] active:scale-95 ${
                                            formData.pendidikan === edu.id 
                                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10 shadow-lg shadow-blue-500/10" 
                                            : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                                        }`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="pendidikan" 
                                            value={edu.id}
                                            checked={formData.pendidikan === edu.id}
                                            onChange={handleChange}
                                            className="sr-only" 
                                        />
                                        <span className={`text-sm font-black transition-colors ${
                                            formData.pendidikan === edu.id 
                                            ? "text-blue-600 dark:text-blue-400" 
                                            : "text-slate-500 dark:text-slate-400"
                                        }`}>
                                            {edu.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.pendidikan && (
                                <p className="text-xs font-bold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                    {errors.pendidikan}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black tracking-wide text-slate-700 dark:text-slate-300 ml-1">
                                Jurusan Pendidikan
                            </label>
                            <input
                                name="jurusanPelamar"
                                value={formData.jurusanPelamar}
                                onChange={handleChange}
                                type="text"
                                placeholder="Contoh: Magister Manajemen Bisnis"
                                className={`w-full rounded-2xl border bg-slate-50/50 dark:bg-slate-950 px-5 py-4 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium ${
                                    errors.jurusanPelamar 
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" 
                                    : "border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/5"
                                }`}
                            />
                            {errors.jurusanPelamar && (
                                <p className="text-xs font-bold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                    {errors.jurusanPelamar}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black tracking-wide text-slate-700 dark:text-slate-300 ml-1">
                                Pengalaman Mengajar
                            </label>
                            <textarea
                                name="pengalaman"
                                value={formData.pengalaman}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Ceritakan singkat pengalaman mengajar atau profesional Anda..."
                                className={`w-full rounded-2xl border bg-slate-50/50 dark:bg-slate-950 px-5 py-4 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium h-32 ${
                                    errors.pengalaman 
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" 
                                    : "border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/5"
                                }`}
                            ></textarea>
                            {errors.pengalaman && (
                                <p className="text-xs font-bold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                    {errors.pengalaman}
                                </p>
                            )}
                        </div>


                        <div className="h-px bg-slate-100 dark:bg-slate-800" />

                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                Pertanyaan Kualifikasi
                            </h3>

                            <div className="space-y-4">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Apakah Anda memiliki gelar S2{' '}
                                    {jurusan?.name}?
                                </p>
                                <div className="flex gap-4">
                                    {['Ya', 'Tidak'].map((opt) => (
                                        <label
                                            key={opt}
                                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-900 has-checked:border-blue-600 has-checked:bg-blue-50 dark:has-checked:bg-blue-900/10"
                                        >
                                            <input
                                                type="radio"
                                                name="kualifikasiS2"
                                                value={opt}
                                                checked={
                                                    formData.kualifikasiS2 ===
                                                    opt
                                                }
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 dark:text-blue-400"
                                            />
                                            <span className="font-bold text-slate-700 dark:text-slate-300">
                                                {opt}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Apakah Anda bersedia ditempatkan di{' '}
                                    {job.daerah}?
                                </p>
                                <div className="flex gap-4">
                                    {['Ya', 'Tidak'].map((opt) => (
                                        <label
                                            key={opt}
                                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-900 has-checked:border-blue-600 has-checked:bg-blue-50 dark:has-checked:bg-blue-900/10"
                                        >
                                            <input
                                                type="radio"
                                                name="siapDitempatkan"
                                                value={opt}
                                                checked={
                                                    formData.siapDitempatkan ===
                                                    opt
                                                }
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 dark:text-blue-400"
                                            />
                                            <span className="font-bold text-slate-700 dark:text-slate-300">
                                                {opt}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`group flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl ${
                                isSaving
                                    ? 'bg-slate-400 cursor-not-allowed'
                                    : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20'
                            }`}
                        >
                            {isSaving ? (
                                <>Menyimpan Data...</>
                            ) : (
                                <>
                                    Submit & Lanjut ke Email{' '}
                                    <Send
                                        size={20}
                                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-slate-400">
                            *Setelah menekan tombol, data akan disimpan dan Anda
                            akan diarahkan ke aplikasi email untuk mengirim
                            berkas resmi (CV/Portofolio).
                        </p>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors">
                <div className="mx-auto max-w-7xl px-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                    <p>© 2026 Web Loker Dosen. Seluruh hak cipta dilindungi.</p>
                </div>
            </footer>
        </div>
    )
}
