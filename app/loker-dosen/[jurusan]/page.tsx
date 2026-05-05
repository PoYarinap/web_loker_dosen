import { DATA_JURUSAN, JobDetail } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getArticlesByJurusan } from "@/lib/api";
import Pagination from "@/components/Pagination";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ jurusan: string }> }) {
  const { jurusan: jurusanSlug } = await params;
  const jurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug);
  if (!jurusan) return { title: "Jurusan Tidak Ditemukan" };
  return {
    title: `Loker Dosen ${jurusan.name} Terbaru April 2026`,
    description: `Daftar lowongan dosen ${jurusan.name} terbaru di berbagai daerah Indonesia bulan April 2026.`,
  };
}

export default async function JurusanPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ jurusan: string }>,
  searchParams: Promise<{ page?: string }>
}) {
  const { jurusan: jurusanSlug } = await params;
  const { page: pageStr } = await searchParams;
  const currentPage = parseInt(pageStr || '1');
  
  const staticJurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug);

  if (!staticJurusan) {
    notFound();
  }

  // Fetch dynamic articles if the jurusan is Akuntansi or Manajemen
  let displayItems: JobDetail[] = [];
  let totalItems = 0;
  let totalPages = 1;
  
  if (jurusanSlug === 'akuntansi' || jurusanSlug === 'manajemen') {
    console.log(`[Page] Detected dynamic jurusan: ${jurusanSlug}. Fetching page ${currentPage} from API...`);
    const apiResult = await getArticlesByJurusan(jurusanSlug, currentPage, 10);
    
    if (apiResult && apiResult.data.length > 0) {
      totalItems = apiResult.total;
      totalPages = apiResult.totalPages;
      
      // Map API data to JobDetail structure
      displayItems = apiResult.data.map(art => ({
        id: art.id,
        jurusan: jurusanSlug,
        daerah: art.title.split(' di ').length > 1 ? art.title.split(' di ')[1].split(' Periode')[0] : "Indonesia",
        bulan: "April",
        tahun: 2026,
        slug: art.slug,
        title: art.title,
        thumbnail: art.thumbnailUrl,
        university: "Universitas Stekom",
        description: art.metaDescription,
        qualificationIntro: "",
        qualifications: [],
        applyEmail: "hrd@stekom.ac.id"
      }));
    } else {
      // Fallback to static items if API fails or returns empty
      displayItems = staticJurusan.items;
      totalItems = staticJurusan.items.length;
    }
  } else {
    displayItems = staticJurusan.items;
    totalItems = staticJurusan.items.length;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-100 transition-colors duration-300">
      <Navbar />

      <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <ChevronRight size={14} />
            <Link href="/loker-dosen" className="hover:text-blue-600 dark:hover:text-blue-400">Loker Dosen</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 dark:text-slate-200">{staticJurusan.name}</span>
          </div>
        </div>

        {/* Hero Header */}
        <header className="mx-auto max-w-7xl px-6 pb-12">
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={staticJurusan.thumbnail}
              alt={staticJurusan.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <h1 className="text-4xl font-black text-white md:text-5xl">Loker Dosen {staticJurusan.name}</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200">
                {staticJurusan.description}
              </p>
            </div>
          </div>
        </header>

        {/* Listings */}
        <main className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Lowongan Tersedia {totalItems > 0 ? `(${totalItems})` : ''}
            </h2>
          </div>

          <div className="grid gap-6">
            {displayItems.length > 0 ? (
              displayItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/loker-dosen/${jurusanSlug}/${item.slug}`}
                  className="group flex flex-col gap-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl dark:hover:shadow-black/40 md:flex-row md:items-center"
                >
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-48">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                        {staticJurusan.name}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
                        {item.daerah}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400 dark:text-slate-500" />
                        {item.bulan} {item.tahun}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end md:px-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all group-hover:bg-blue-600 group-hover:text-white">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-slate-500">Tidak ada lowongan yang ditemukan.</p>
              </div>
            )}
          </div>

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            baseUrl={`/loker-dosen/${jurusanSlug}`} 
          />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12 transition-colors">
          <div className="mx-auto max-w-7xl px-6 text-center text-slate-500 dark:text-slate-400">
            <p>© 2026 Web Loker Dosen. Seluruh hak cipta dilindungi.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
