// src/hooks/useUrlFilters.ts
import { useSearchParams } from 'react-router-dom';

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const searchBy = searchParams.get('searchBy') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const updateFilters = (updates: { search?: string; searchBy?: string; page?: number }) => {
    const newParams = new URLSearchParams(searchParams);

    if (updates.search !== undefined) {
      if (updates.search) newParams.set('search', updates.search);
      else newParams.delete('search');
      newParams.set('page', '1');
    }

    if (updates.searchBy !== undefined) {
      if (updates.searchBy !== 'all') newParams.set('searchBy', updates.searchBy);
      else newParams.delete('searchBy');
      newParams.set('page', '1'); // Reseta a página ao mudar o tipo de busca
    }

    if (updates.page !== undefined) {
      newParams.set('page', updates.page.toString());
    }

    setSearchParams(newParams, { replace: true });
  };

  return { search, searchBy, page, updateFilters };
}