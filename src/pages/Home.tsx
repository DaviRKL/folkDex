// src/pages/Home.tsx
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-white">{t('findPeople')}</h1>
      {/* Aqui entrarão a barra de busca e a tabela posteriormente */}
    </div>
  );
}