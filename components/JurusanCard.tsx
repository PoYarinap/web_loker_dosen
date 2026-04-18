import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface JurusanCardProps {
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  count: number;
}

export default function JurusanCard({ name, slug, thumbnail, description, count }: JurusanCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50/50 dark:hover:shadow-blue-900/10">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 dark:bg-slate-950/90 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 backdrop-blur-sm">
          {count} Lowongan
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-black text-slate-900 dark:text-slate-100">Loker Dosen {name}</h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
          {description}
        </p>
        <Link
          href={`/loker-dosen/${slug}`}
          className="inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 transition-all hover:gap-3"
        >
          Lihat Lowongan <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
