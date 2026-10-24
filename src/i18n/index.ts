// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      findPeople: "Find People",
      searchPlaceholder: "Search people by ID, Name, Last Name, Title, Birth Date or Age....",
      table: {
        choose: "Choose a filter",
        id: "ID",
        firstName: "First Name",
        lastName: "Last Name",
        title: "Title",
        date: "Birth Date",
        age: "Age",
        actions: "Actions",
        viewProfile: "View profile",
      },
      noResults: "No results found",
      tryAgain: "Try again using another term",
      profile: {
        back: "Back",
        info: "Info",
        location: "Location",
        login: "Login",
      },
    },
  },
  pt: {
    translation: {
      findPeople: "Encontrar Pessoas",
      searchPlaceholder: "Pesquise as pessoas pelo ID, Nome, Sobrenome, Título, Data de Nascimento ou Idade....",
      table: {
        choose: "Escolha um filtro",
        id: "ID",
        firstName: "Nome",
        lastName: "Sobrenome",
        title: "Título",
        date: "Data de Nasc.",
        age: "Idade",
        actions: "Ações",
        viewProfile: "Ver perfil",
      },
      noResults: "Nenhum resultado encontrado",
      tryAgain: "Tente novamente utilizando outro termo",
      profile: {
        back: "Voltar",
        info: "Info",
        location: "Localização",
        login: "Login",
      },
    },
  },
};

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador automaticamente
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt", // Idioma padrão caso a detecção falhe
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
