// src/components/UserTable.tsx
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Função para formatar a data para DD/MM/YYYY
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR');
  };

  // Função para encurtar o UUID (como no protótipo)
  const formatId = (uuid: string) => uuid.substring(0, 12);

  if (users.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mt-8">
      {/* Versão Desktop (Oculta no Mobile) */}
      <div className="hidden md:block w-full overflow-x-auto rounded-t-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-3 px-4 font-semibold">{t('table.id')}</th>
              <th className="py-3 px-4 font-semibold">{t('table.firstName')}</th>
              <th className="py-3 px-4 font-semibold">{t('table.lastName')}</th>
              <th className="py-3 px-4 font-semibold">{t('table.title')}</th>
              <th className="py-3 px-4 font-semibold">{t('table.date')}</th>
              <th className="py-3 px-4 font-semibold">{t('table.age')}</th>
              <th className="py-3 px-4 font-semibold">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.login.uuid} className="border-b border-surface/50 hover:bg-surface/30 transition-colors">
                <td className="py-4 px-4 text-grey-300">{formatId(user.login.uuid)}</td>
                <td className="py-4 px-4 text-grey-300">{user.name.first}</td>
                <td className="py-4 px-4 text-grey-300">{user.name.last}</td>
                <td className="py-4 px-4 text-grey-300">{user.name.title}</td>
                <td className="py-4 px-4 text-grey-300">{formatDate(user.dob.date)}</td>
                <td className="py-4 px-4 text-grey-300">{user.dob.age}</td>
                <td className="py-4 px-4">
                  <Link 
                    to={`/profile/${user.login.uuid}`} 
                    className="text-primary hover:text-grey-200 font-medium transition-colors"
                  >
                    {t('table.viewProfile')}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versão Mobile (Oculta no Desktop) */}
      <div className="md:hidden w-full rounded-t-lg overflow-hidden">
        <div className="flex bg-primary text-white py-3 px-4 font-semibold">
          <div className="flex-1">{t('table.id')}</div>
          <div className="flex-1">{t('table.firstName')}</div>
        </div>
        <div className="flex flex-col">
          {users.map((user) => (
            <div 
              key={user.login.uuid}
              onClick={() => navigate(`/profile/${user.login.uuid}`)}
              className="flex py-4 px-4 border-b border-surface/50 active:bg-surface/30 cursor-pointer"
            >
              <div className="flex-1 text-grey-300">{formatId(user.login.uuid)}</div>
              <div className="flex-1 text-grey-300">{user.name.first}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}