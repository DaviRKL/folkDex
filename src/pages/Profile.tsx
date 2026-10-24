// src/pages/Profile.tsx
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen p-6 md:p-12">
      <button 
        onClick={() => navigate(-1)} 
        className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition-colors"
      >
        <span>&larr;</span> {t('profile.back')}
      </button>
      <div className="text-center text-white">
        <h2 className="text-xl">Perfil Temporário: {id}</h2>
      </div>
    </div>
  );
}