// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { UsersProvider } from './contexts/UsersContext';
import { Header } from './components/Header';

export function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <div className="min-h-screen flex flex-col bg-background text-grey-200 transition-colors duration-300">
          <Header />
          
          {/* Conteúdo principal (As páginas ocuparão o restante da tela) */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </UsersProvider>
    </BrowserRouter>
  );
}