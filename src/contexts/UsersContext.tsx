// src/contexts/UsersContext.tsx
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { fetchUsers } from '../services/api';
import { useUrlFilters } from '../hooks/useUrlFilters';

interface UsersContextData {
  users: User[]; // Todos os 200
  paginatedUsers: User[]; // Os 10 da página atual
  loading: boolean;
  error: string | null;
  totalPages: number;
  getUserById: (uuid: string) => User | undefined;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { search, age, page } = useUrlFilters();

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Ocorreu um erro ao carregar os dados:' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  // Filtra reativamente (RN2 e RN3) apenas quando a lista, busca ou idade mudarem
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const matchSearch = search ? fullName.includes(search.toLowerCase()) : true;
      const matchAge = age ? user.dob.age.toString() === age : true;
      
      return matchSearch && matchAge;
    });
  }, [users, search, age]);

  // RN1: Paginação no client-side (10 por página)
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Função para a tela de Perfil (RF3) resgatar o usuário sem precisar fazer novo fetch
  const getUserById = (uuid: string) => {
    return users.find(user => user.login.uuid === uuid);
  };

  return (
    <UsersContext.Provider value={{ users, paginatedUsers, loading, error, totalPages, getUserById }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}