// src/types/index.ts

export interface User {
  login: {
    uuid: string;
    username: string;
    // O campo password foi intencionalmente omitido aqui para segurança (RF5)
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  location: {
    street: { name: string; number: number };
    city: string;
    state: string;
    country: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface ApiResponse {
  results: User[];
}