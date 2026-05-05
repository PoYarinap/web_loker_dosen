"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.pesan.trim()) newErrors.pesan = "Pesan tidak boleh kosong";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSaving(true);
    const SPREADSHEET_URL = process.env.NEXT_PUBLIC_SPREADSHEET_URL;

    try {
      await fetch(SPREADSHEET_URL!, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "kontak",
          ...formData
        }),
      });
      
      setIsSuccess(true);
      setFormData({ nama: "", email: "", pesan: "" });
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-8">Hubungi <span className="text-blue-600">Tim Kami</span></h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Memiliki pertanyaan atau ingin bekerja sama? Kami siap membantu anda menemukan solusi terbaik untuk kebutuhan karir akademik.
          </p>
        </div>
      </section>


      {/* Contact Section - Styled like CTA (Refined Sizes) */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto bg-linear-to-br from-[#0a1931] to-[#16213e] text-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-blue-900/40 border border-white/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Hubungi <span className="text-blue-400">Tim Kami</span></h2>
              <p className="text-slate-400 text-base mb-10 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                Miliki pertanyaan atau ingin bekerja sama memasang lowongan dosen? Kami siap membantu anda.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-colors group-hover:bg-blue-600">
                    <Mail className="text-blue-400 group-hover:text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Email Resmi</div>
                    <div className="text-base font-bold tracking-tight">admin@loker-dosen.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-colors group-hover:bg-emerald-500">
                    <Phone className="text-emerald-400 group-hover:text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">WhatsApp</div>
                    <div className="text-base font-bold tracking-tight">+62 853-8778-0731</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-5/12 w-full">
              <div className="bg-white/5 p-8 rounded-4xl border border-white/10 backdrop-blur-sm">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="text-emerald-500" size={32} />
                    </div>
                    <h4 className="text-xl font-black mb-2">Pesan Terkirim!</h4>
                    <p className="text-slate-400 text-sm font-medium">Terima kasih telah menghubungi kami. Kami akan segera membalasnya.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <input 
                          type="text" 
                          placeholder="Nama Anda" 
                          value={formData.nama}
                          onChange={(e) => {
                            setFormData({...formData, nama: e.target.value})
                            if (errors.nama) setErrors(prev => ({...prev, nama: ''}))
                          }}
                          className={`w-full bg-white/5 border rounded-xl px-5 py-3.5 text-sm outline-none transition-all font-medium placeholder:text-slate-500 ${
                            errors.nama 
                            ? "border-red-500 focus:bg-white/10" 
                            : "border-white/10 focus:border-blue-500 focus:bg-white/10"
                          }`}
                        />
                        {errors.nama && <p className="text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">{errors.nama}</p>}
                      </div>
                      <div className="space-y-1">
                        <input 
                          type="email"
                          placeholder="Alamat Email" 
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({...formData, email: e.target.value})
                            if (errors.email) setErrors(prev => ({...prev, email: ''}))
                          }}
                          className={`w-full bg-white/5 border rounded-xl px-5 py-3.5 text-sm outline-none transition-all font-medium placeholder:text-slate-500 ${
                            errors.email 
                            ? "border-red-500 focus:bg-white/10" 
                            : "border-white/10 focus:border-blue-500 focus:bg-white/10"
                          }`}
                        />
                        {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <textarea 
                        placeholder="Apa yang bisa kami bantu?" 
                        value={formData.pesan}
                        onChange={(e) => {
                          setFormData({...formData, pesan: e.target.value})
                          if (errors.pesan) setErrors(prev => ({...prev, pesan: ''}))
                        }}
                        className={`w-full bg-white/5 border rounded-2xl px-5 py-3.5 text-sm outline-none transition-all h-28 font-medium placeholder:text-slate-500 resize-none ${
                          errors.pesan 
                          ? "border-red-500 focus:bg-white/10" 
                          : "border-white/10 focus:border-blue-500 focus:bg-white/10"
                        }`}
                      />
                      {errors.pesan && <p className="text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">{errors.pesan}</p>}
                    </div>
                    <button 
                      disabled={isSaving}
                      type="submit"
                      className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-base transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Mengirim...
                        </>
                      ) : (
                        "Kirim Pesan Sekarang"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p>© 2026 Web Loker Dosen. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
