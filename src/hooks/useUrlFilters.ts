// src/hooks/useUrlFilters.ts
import { useSearchParams } from 'react-router-dom';

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const age = searchParams.get('age') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const updateFilters = (updates: { search?: string; age?: string; page?: number }) => {
    const newParams = new URLSearchParams(searchParams);

    if (updates.search !== undefined) {
      if (updates.search) newParams.set('search', updates.search);
      else newParams.delete('search');
      newParams.set('page', '1'); // Reseta a página ao buscar
    }

    if (updates.age !== undefined) {
      if (updates.age) newParams.set('age', updates.age);
      else newParams.delete('age');
      newParams.set('page', '1');
    }

    if (updates.page !== undefined) {
      newParams.set('page', updates.page.toString());
    }

    // Usamos replace: true para não poluir o histórico do navegador a cada tecla digitada
    setSearchParams(newParams, { replace: true });
  };

  return { search, age, page, updateFilters };
}