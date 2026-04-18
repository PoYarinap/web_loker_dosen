import React from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, FileText, Users, Award, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Panduan Karir Dosen - Web Loker Dosen",
  description: "Pelajari tips dan trik untuk sukses berkarier sebagai dosen di Indonesia.",
};

export default function CareerGuidePage() {
  const guides = [
    {
      title: "Persiapan CV & Portofolio",
      description: "Cara membuat CV akademik yang menarik perhatian rekrutmen universitas.",
      icon: <FileText className="text-blue-600" size={32} />,
      tips: ["Cantumkan riwayat penelitian", "Sertakan publikasi ilmiah", "Gunakan format formal"],
    },
    {
      title: "Sukses Interview Kampus",
      description: "Menjawab pertanyaan sulit saat wawancara dengan dekan dan rektor.",
      icon: <Users className="text-purple-600" size={32} />,
      tips: ["Pahami visi misi kampus", "Siapkan rencana penelitian", "Tunjukkan dedikasi mengajar"],
    },
    {
      title: "Tips Lolos Sertifikasi Dosen",
      description: "Langkah-langahl mendapatkan Serdos untuk menunjang karir akademik.",
      icon: <Award className="text-emerald-600" size={32} />,
      tips: ["Keaktifan di SISTER", "Penuhi syarat administratif", "Tingkatkan skor TOEFL/TPA"],
    },
    {
      title: "Menulis Publikasi Ilmiah",
      description: "Strategi menembus jurnal nasional terakreditasi SINTA atau Scopus.",
      icon: <BookOpen className="text-orange-600" size={32} />,
      tips: ["Pilih topik yang relevan", "Gunakan referensi terbaru", "Paham etika publikasi"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Panduan <span className="text-blue-600">Karir Dosen</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Kumpulan artikel dan tips untuk membantu Anda melangkah lebih jauh dalam dunia akademik Indonesia.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-4xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-transparent dark:border-slate-800 transition-all hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  {guide.icon}
                </div>
                <h2 className="text-2xl font-black leading-tight">{guide.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8">{guide.description}</p>
              
              <div className="space-y-3">
                {guide.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{tip}</span>
                  </div>
                ))}
              </div>
              
              <button className="mt-10 w-fit px-10 py-3 rounded-full bg-blue-600 text-white font-black text-sm transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95">
                Baca Selengkapnya
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t dark:border-slate-800 py-12 bg-white dark:bg-slate-900 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p>© 2026 Web Loker Dosen. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
