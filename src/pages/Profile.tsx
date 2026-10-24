// src/pages/Profile.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../contexts/UsersContext';

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUserById, loading } = useUsers();
  
  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'login'>('info');

  if (loading) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex justify-center text-primary font-medium">
        Carregando perfil...
      </div>
    );
  }

  const user = id ? getUserById(id) : undefined;

  if (!user) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex flex-col items-center">
        <h2 className="text-xl text-white mb-4">Usuário não encontrado.</h2>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">
          Voltar para a Home
        </button>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR');
  };

  // Componente interno para padronizar a renderização dos campos e manter o Clean Code
  const ProfileField = ({ label, value }: { label: string; value: string | number }) => (
    <div className="mb-5">
      <p className="font-bold text-white mb-1 text-sm">{label}</p>
      <p className="text-grey-400 text-sm">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-12 w-full max-w-2xl mx-auto relative">
      {/* Botão de Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="text-grey-400 hover:text-white flex items-center gap-2 transition-colors absolute top-6 md:top-12 left-6 md:left-12"
      >
        <span>&larr;</span> {t('profile.back')}
      </button>

      {/* Cabeçalho do Usuário */}
      <div className="w-full flex flex-col items-center mt-12 mb-10">
        <img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold text-white">
          {user.name.first} {user.name.last}
        </h1>
        <p className="text-grey-400">{user.name.title}</p>
      </div>

      {/* Navegação por Abas */}
      <div className="w-full flex justify-center gap-8 border-b border-surface/50 mb-8">
        {(['info', 'location', 'login'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-2 capitalize font-medium transition-colors ${
              activeTab === tab
                ? 'text-white border-b-2 border-primary'
                : 'text-grey-500 hover:text-grey-300'
            }`}
          >
            {t(`profile.${tab}`)}
          </button>
        ))}
      </div>

      {/* Conteúdo Dinâmico das Abas */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[200px] animate-fadeIn">
          {activeTab === 'info' && (
            <>
              <ProfileField label={t('table.firstName')} value={user.name.first} />
              <ProfileField label={t('table.lastName')} value={user.name.last} />
              <ProfileField label={t('table.title')} value={user.name.title} />
              <ProfileField label={t('table.date')} value={formatDate(user.dob.date)} />
              <ProfileField label={t('table.age')} value={user.dob.age} />
            </>
          )}

          {activeTab === 'location' && (
            <>
              <ProfileField label="Street" value={`${user.location.street.name}, ${user.location.street.number}`} />
              <ProfileField label="City" value={user.location.city} />
              <ProfileField label="State" value={user.location.state} />
              <ProfileField label="Country" value={user.location.country} />
            </>
          )}

          {activeTab === 'login' && (
            <>
              <ProfileField label="UUID" value={user.login.uuid} />
              <ProfileField label="Username" value={user.login.username} />
              <ProfileField label="Email" value={user.email} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}