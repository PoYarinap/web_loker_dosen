import { DATA_JURUSAN, JobDetail } from '@/lib/data'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/api'
import FormClient from './FormClient'

export default async function ApplicationFormPage({
    params,
}: {
    params: Promise<{ jurusan: string; slug: string }>
}) {
    const { jurusan: jurusanSlug, slug: jobSlug } = await params
    
    let job: JobDetail | null = null;
    let jurusanName = '';

    // Check if it's dynamic
    if (jurusanSlug === 'akuntansi' || jurusanSlug === 'manajemen') {
        const apiArticle = await getArticleBySlug(jurusanSlug, jobSlug);
        if (apiArticle) {
            job = {
                id: apiArticle.id,
                jurusan: jurusanSlug,
                daerah: apiArticle.title.split(' di ').length > 1 ? apiArticle.title.split(' di ')[1].split(' Periode')[0] : "Indonesia",
                bulan: "April",
                tahun: 2026,
                slug: apiArticle.slug,
                title: apiArticle.title,
                thumbnail: apiArticle.thumbnailUrl,
                university: "Universitas Stekom",
                description: apiArticle.metaDescription,
                qualificationIntro: "Kualifikasi Umum:",
                qualifications: [],
                applyEmail: "hrd@stekom.ac.id"
            };
            jurusanName = jurusanSlug === 'akuntansi' ? 'Akuntansi' : 'Manajemen';
        }
    }

    // Fallback to static
    if (!job) {
        const staticJurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug)
        const staticJob = staticJurusan?.items.find((item) => item.slug === jobSlug)
        if (staticJob) {
            job = staticJob;
            jurusanName = staticJurusan?.name || '';
        }
    }

    if (!job) {
        notFound()
    }

    return (
        <FormClient 
            job={job} 
            jurusanName={jurusanName} 
            jurusanSlug={jurusanSlug} 
            jobSlug={jobSlug} 
        />
    )
}
