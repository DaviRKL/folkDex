// src/components/Pagination.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Lógica simples para exibir páginas próximas (ex: até 5 botões de número)
  const getVisiblePages = () => {
    let start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 4, totalPages);
    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getVisiblePages();

  return (
    <div className="flex items-center gap-2 mt-8 mb-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-grey-500 text-grey-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            currentPage === page
              ? 'bg-primary text-white border border-primary'
              : 'border border-grey-500 text-grey-300 hover:bg-surface'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-grey-500 text-grey-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}