// src/pages/Home.tsx
import { useTranslation } from 'react-i18next';
import { useUsers } from '../contexts/UsersContext';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { UserTable } from '../components/UserTable';
import { Pagination } from '../components/Pagination';
import { SearchInput } from '../components/SearchInput';

export function Home() {
  const { t } = useTranslation();
  const { paginatedUsers, loading, error, totalPages } = useUsers();
  const { page, updateFilters } = useUrlFilters();

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-4 mb-8 text-grey-200">{t('findPeople')}</h1>
      
      {/* Componente de Busca Reativa */}
      <SearchInput />

      {/* Estados de Carregamento e Erro */}
      {loading && (
        <div className="mt-12 text-primary font-medium">Carregando dados...</div>
      )}
      
      {error && (
        <div className="mt-12 text-red-500">{error}</div>
      )}

      {/* Estado com Sucesso e com Resultados */}
      {!loading && !error && paginatedUsers.length > 0 && (
        <>
          <UserTable users={paginatedUsers} />
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={(newPage) => updateFilters({ page: newPage })} 
          />
        </>
      )}

      {/* Empty State: Nenhum resultado encontrado */}
      {!loading && !error && paginatedUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <h2 className="text-2xl font-bold text-grey-200 mb-3">{t('noResults')}</h2>
          <p className="text-grey-400 text-sm">{t('tryAgain')}</p>
        </div>
      )}
    </div>
  );
}