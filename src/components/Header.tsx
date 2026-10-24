// src/components/Header.tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const { i18n } = useTranslation();
  
  // O protótipo usa o tema escuro como padrão
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Efeito para injetar ou remover a classe 'dark' no HTML e salvar preferência
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language.startsWith('pt') ? 'PT' : 'EN';

  return (
    <header className="w-full bg-surface py-4 px-6 md:px-12 flex justify-between items-center shadow-sm transition-colors duration-300">
      {/* Logo alinhada à esquerda */}
      <Link to="/" className="hover:opacity-80 transition-opacity" aria-label="FolkDex">
        <img src="/logo/folkDex.png" alt="FolkDex" className="h-12 w-auto" />
      </Link>

      {/* Controles alinhados à direita */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 p-2 rounded-lg text-grey-300 hover:bg-grey-700/50 hover:text-white transition-all font-medium"
          title="Change language"
        >
          <Languages size={20} />
          <span>{currentLang}</span>
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg text-grey-300 hover:bg-grey-700/50 hover:text-white transition-all"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}