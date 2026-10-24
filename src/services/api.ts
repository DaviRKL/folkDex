// src/services/api.ts
import type { ApiResponse, User } from '../types';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://randomuser.me/api/?results=200&seed=discover');
  
  if (!response.ok) {
    throw new Error('Falha ao buscar usuários');
  }

  const data = await response.json();

  // RF5: Limpeza de dados sensíveis antes de enviar para o Contexto
  const safeUsers = data.results.map((user: any) => {
    delete user.login.password;
    delete user.login.salt;
    delete user.login.md5;
    delete user.login.sha1;
    delete user.login.sha256;
    return user as User;
  });

  return safeUsers;
}