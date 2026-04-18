"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/loker-dosen", label: "Semua Lowongan" },
        { href: "/panduan-karir", label: "Panduan Karir" },
        { href: "/tentang-kami", label: "Tentang Kami" },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
                <Link
                    href="/"
                    className="flex items-center group transition-transform hover:scale-105"
                >
                    <div className="relative h-12 w-40 md:h-16 md:w-52 dark:brightness-110">
                        <Image
                            src="/img/loogo.png"
                            alt="Logo Web Loker Dosen"
                            fill
                            priority
                            sizes="(max-width: 768px) 160px, 208px"
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden gap-8 text-sm font-semibold text-slate-600 dark:text-slate-400 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    
                    {/* Desktop Pasang Loker */}
                    <Link 
                        href="/tentang-kami"
                        className="hidden md:block rounded-full bg-blue-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-800 hover:shadow-lg active:scale-95 text-center"
                    >
                        Pasang Loker
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 md:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b dark:border-slate-800 animate-in slide-in-from-top duration-200">
                    <div className="flex flex-col p-6 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-base font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link 
                            href="/tentang-kami"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 w-full rounded-2xl bg-blue-900 py-4 text-center text-sm font-black text-white shadow-xl shadow-blue-950/20"
                        >
                            Pasang Loker
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
