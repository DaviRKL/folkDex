// src/services/api.ts
import type { ApiResponse, User } from '../types';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://randomuser.me/api/?results=200&seed=discover');
  
  if (!response.ok) {
    throw new Error('Falha ao buscar usuários');
  }

  const data: ApiResponse = await response.json();

  // RF5: Limpeza de dados sensíveis antes de enviar para o Contexto
  const safeUsers: User[] = data.results.map(({ login, ...user }) => ({
    ...user,
    login: {
      uuid: login.uuid,
      username: login.username,
    },
  }));

  return safeUsers;
}