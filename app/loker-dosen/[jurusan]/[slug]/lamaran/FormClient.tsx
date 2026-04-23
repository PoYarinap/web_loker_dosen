'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { JobDetail } from '@/lib/data'

export default function FormClient({ 
    job, 
    jurusanName, 
    jurusanSlug, 
    jobSlug 
}: { 
    job: JobDetail, 
    jurusanName: string,
    jurusanSlug: string,
    jobSlug: string
}) {
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

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        
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
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        setIsSaving(true)
        try {
            const scriptURL = process.env.NEXT_PUBLIC_SPREADSHEET_URL || ''
            if (scriptURL) {
                await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        ...formData, 
                        posisiDilamar: job.title 
                    }),
                })
            }
        } catch (error) {
            console.error('Error saving to spreadsheet:', error)
        }

        const subject = encodeURIComponent(`Lamaran: ${job.title}`)
        const body = encodeURIComponent(
            `Nama: ${formData.nama}\n` +
            `Email: ${formData.email}\n` +
            `WhatsApp: ${formData.whatsapp}\n` +
            `Pendidikan: ${formData.pendidikan}\n` +
            `Jurusan: ${formData.jurusanPelamar}\n` +
            `Domisili: ${formData.domisili}\n` +
            `Pengalaman: ${formData.pengalaman}\n` +
            `Kualifikasi S2: ${formData.kualifikasiS2}\n` +
            `Siap Ditempatkan: ${formData.siapDitempatkan}\n\n` +
            `Posisi Dilamar: ${job.title}`
        )
        const mailto = `mailto:${job.applyEmail}?subject=${subject}&body=${body}`

        setIsSaving(false)
        setIsSubmitted(true)
        setTimeout(() => { window.location.href = mailto }, 1500)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
                <Navbar />
                <main className="flex flex-col items-center justify-center px-6 py-24 text-center">
                    <div className="w-full max-w-xl rounded-4xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 shadow-2xl">
                        <div className="mb-8 flex justify-center">
                            <CheckCircle2 size={64} className="text-green-500" />
                        </div>
                        <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">Data Berhasil Disimpan!</h1>
                        <p className="mb-10 text-lg text-slate-500">Membuka aplikasi email untuk mengirim berkas resmi...</p>
                        <Link href="/" className="inline-flex items-center gap-2 font-bold text-slate-400 hover:text-blue-600">
                            <ArrowLeft size={18} /> Kembali ke Beranda
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main className="mx-auto max-w-3xl px-6 py-12">
                <Link href={`/loker-dosen/${jurusanSlug}/${jobSlug}`} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                    <ArrowLeft size={16} /> Kembali ke Detail Lowongan
                </Link>
                <div className="card-premium p-8 md:p-12">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Formulir Lamaran</h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
                            Lengkapi data untuk melamar sebagai <strong>Dosen {jurusanName}</strong> di {job.daerah}.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="form-label">Nama Lengkap</label>
                                <input name="nama" value={formData.nama} onChange={handleChange} type="text" placeholder="Nama sesuai KTP" className="input-field" />
                                {errors.nama && <p className="text-xs font-bold text-red-500 mt-1">{errors.nama}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="form-label">Email Aktif</label>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@gmail.com" className="input-field" />
                                {errors.email && <p className="text-xs font-bold text-red-500 mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="form-label">Nomor WhatsApp</label>
                                <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" placeholder="0812..." className="input-field" />
                                {errors.whatsapp && <p className="text-xs font-bold text-red-500 mt-1">{errors.whatsapp}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="form-label">Domisili Saat Ini</label>
                                <input name="domisili" value={formData.domisili} onChange={handleChange} type="text" placeholder="Kota tinggal" className="input-field" />
                                {errors.domisili && <p className="text-xs font-bold text-red-500 mt-1">{errors.domisili}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="form-label">Pendidikan Terakhir</label>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {['S2', 'S3', 'Profesi'].map((edu) => (
                                    <label key={edu} className={`flex cursor-pointer items-center justify-center rounded-2xl border py-4 transition-all ${
                                        formData.pendidikan === edu 
                                        ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm" 
                                        : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                                    }`}>
                                        <input type="radio" name="pendidikan" value={edu} checked={formData.pendidikan === edu} onChange={handleChange} className="sr-only" />
                                        <span className="text-sm font-black">{edu === 'Profesi' ? 'Profesi/Spesialis' : `Magister (${edu})`}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.pendidikan && <p className="text-xs font-bold text-red-500 mt-1">{errors.pendidikan}</p>}
                        </div>

                        <div className="space-y-3">
                            <label className="form-label">Jurusan Pendidikan</label>
                            <input name="jurusanPelamar" value={formData.jurusanPelamar} onChange={handleChange} type="text" placeholder="Contoh: Magister Akuntansi" className="input-field" />
                            {errors.jurusanPelamar && <p className="text-xs font-bold text-red-500 mt-1">{errors.jurusanPelamar}</p>}
                        </div>

                        <div className="space-y-3">
                            <label className="form-label">Pengalaman Mengajar</label>
                            <textarea name="pengalaman" value={formData.pengalaman} onChange={handleChange} rows={4} placeholder="Ceritakan singkat pengalaman Anda..." className="input-field h-32"></textarea>
                            {errors.pengalaman && <p className="text-xs font-bold text-red-500 mt-1">{errors.pengalaman}</p>}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">Pertanyaan Kualifikasi</h3>
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Apakah Anda memiliki gelar S2 {jurusanName}?</p>
                                <div className="flex gap-4">
                                    {['Ya', 'Tidak'].map((opt) => (
                                        <label key={opt} className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border py-3 transition-all ${
                                            formData.kualifikasiS2 === opt 
                                            ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm" 
                                            : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                                        }`}>
                                            <input type="radio" name="kualifikasiS2" value={opt} checked={formData.kualifikasiS2 === opt} onChange={handleChange} className="h-4 w-4 accent-blue-600" />
                                            <span className="font-bold">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Apakah Anda bersedia ditempatkan di {job.daerah}?</p>
                                <div className="flex gap-4">
                                    {['Ya', 'Tidak'].map((opt) => (
                                        <label key={opt} className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border py-3 transition-all ${
                                            formData.siapDitempatkan === opt 
                                            ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm" 
                                            : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                                        }`}>
                                            <input type="radio" name="siapDitempatkan" value={opt} checked={formData.siapDitempatkan === opt} onChange={handleChange} className="h-4 w-4 accent-blue-600" />
                                            <span className="font-bold">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={isSaving} className="btn-primary group w-full flex items-center justify-center gap-3">
                            {isSaving ? 'Menyimpan...' : (
                                <>Submit & Lanjut ke Email <Send size={20} /></>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}
