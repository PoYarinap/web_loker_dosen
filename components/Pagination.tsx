
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            {currentPage > 1 ? (
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all"
                >
                    <ChevronLeft size={20} />
                </Link>
            ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-700 cursor-not-allowed">
                    <ChevronLeft size={20} />
                </div>
            )}

            <div className="flex items-center gap-2">
                {getPages().map((page, index) => (
                    typeof page === 'number' ? (
                        <Link
                            key={index}
                            href={`${baseUrl}?page=${page}`}
                            className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold transition-all ${
                                currentPage === page
                                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-500'
                            }`}
                        >
                            {page}
                        </Link>
                    ) : (
                        <span key={index} className="px-2 text-slate-400">
                            {page}
                        </span>
                    )
                ))}
            </div>

            {currentPage < totalPages ? (
                <Link
                    href={`${baseUrl}?page=${currentPage + 1}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all"
                >
                    <ChevronRight size={20} />
                </Link>
            ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-700 cursor-not-allowed">
                    <ChevronRight size={20} />
                </div>
            )}
        </div>
    );
}
