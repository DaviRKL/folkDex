// src/contexts/UsersContext.tsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { User } from "../types";
import type { ReactNode } from "react";
import { fetchUsers } from "../services/api";
import { useUrlFilters } from "../hooks/useUrlFilters";

interface UsersContextData {
  users: User[];
  paginatedUsers: User[];
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

  // Recebemos o novo parâmetro searchBy
  const { search, searchBy, page } = useUrlFilters();

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Ocorreu um erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return users.filter((user) => {
      if (!searchTerm) return true; // Se o input estiver vazio, retorna todos

      const shortId = user.login.uuid.substring(0, 12).toLowerCase();
      const fullId = user.login.uuid.toLowerCase();
      const firstName = user.name.first.toLowerCase();
      const lastName = user.name.last.toLowerCase();
      const title = user.name.title.toLowerCase();
      const formattedDate = new Date(user.dob.date).toLocaleDateString("pt-BR");
      const ageStr = user.dob.age.toString();

      // Aplica o filtro estritamente na coluna selecionada
      switch (searchBy) {
        case "id":
          return shortId.includes(searchTerm) || fullId.includes(searchTerm);
        case "firstName":
          return firstName.includes(searchTerm);
        case "lastName":
          return lastName.includes(searchTerm);
        case "title":
          return title.includes(searchTerm);
        case "date":
          return formattedDate.includes(searchTerm);
        case "age":
          return ageStr === searchTerm; // Correspondência exata para evitar que "8" retorne "88"
        case "all":
        default:
          return (
            shortId.includes(searchTerm) ||
            fullId.includes(searchTerm) ||
            firstName.includes(searchTerm) ||
            lastName.includes(searchTerm) ||
            title.includes(searchTerm) ||
            formattedDate.includes(searchTerm) ||
            ageStr === searchTerm
          );
      }
    });
  }, [users, search, searchBy]);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const getUserById = (uuid: string) => {
    return users.find((user) => user.login.uuid === uuid);
  };

  return (
    <UsersContext.Provider
      value={{ users, paginatedUsers, loading, error, totalPages, getUserById }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
