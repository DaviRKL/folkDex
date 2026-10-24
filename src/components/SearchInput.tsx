// src/components/SearchInput.tsx
import { useTranslation } from 'react-i18next';
import { useUrlFilters } from '../hooks/useUrlFilters';

export function SearchInput() {
  const { t } = useTranslation();
  const { search, updateFilters } = useUrlFilters();

  return (
    <div className="w-full max-w-5xl mb-8">
      <input
        type="text"
        value={search}
        // A cada tecla digitada, atualizamos a URL (que aciona o Contexto para refiltrar)
        onChange={(e) => updateFilters({ search: e.target.value })}
        placeholder={t('searchPlaceholder')}
        className="w-full bg-transparent border border-grey-500 rounded-lg px-4 py-3 text-white placeholder:text-grey-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
    </div>
  );
}