import { DATA_JURUSAN } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export async function generateMetadata({ params }: { params: Promise<{ jurusan: string }> }) {
  const { jurusan: jurusanSlug } = await params;
  const jurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug);
  if (!jurusan) return { title: "Jurusan Tidak Ditemukan" };
  return {
    title: `Loker Dosen ${jurusan.name} Terbaru April 2026`,
    description: `Daftar lowongan dosen ${jurusan.name} terbaru di berbagai daerah Indonesia bulan April 2026.`,
  };
}

export default async function JurusanPage({ params }: { params: Promise<{ jurusan: string }> }) {
  const { jurusan: jurusanSlug } = await params;
  const jurusan = DATA_JURUSAN.find((j) => j.slug === jurusanSlug);

  if (!jurusan) {
    notFound();
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
            <span className="text-slate-900 dark:text-slate-200">{jurusan.name}</span>
          </div>
        </div>

        {/* Hero Header */}
        <header className="mx-auto max-w-7xl px-6 pb-12">
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={jurusan.thumbnail}
              alt={jurusan.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <h1 className="text-4xl font-black text-white md:text-5xl">Loker Dosen {jurusan.name}</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200">
                {jurusan.description}
              </p>
            </div>
          </div>
        </header>

        {/* Listings */}
        <main className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Lowongan Tersedia ({jurusan.items.length})</h2>
          </div>

          <div className="grid gap-6">
            {jurusan.items.map((item) => (
              <Link
                key={item.id}
                href={`/loker-dosen/${jurusan.slug}/${item.slug}`}
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
                      {jurusan.name}
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
            ))}
          </div>
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
