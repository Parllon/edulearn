import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import MeusCursos from './pages/MeusCursos';
import AssistirAula from './pages/AssistirAula';
import Certificados from './pages/Certificados';
import Conquistas from './pages/Conquistas';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { SettingsProvider } from './context/SettingsProvider';
import styles from './App.module.css';

function AppShell() {
  const location = useLocation();
  const isWatchPage = location.pathname.startsWith('/assistir');
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className={styles.root}>
      {/* Cabeçalho Superior */}
      <Header onToggleNav={() => setNavOpen((o) => !o)} />

      {/* Container Principal de Layout */}
      <div className={styles.container}>
        {/* Barra Lateral Esquerda de Navegação */}
        <LeftSidebar open={navOpen} onClose={() => setNavOpen(false)} />

        {/* Área de Conteúdo Central */}
        {isWatchPage ? (
          <Routes>
            <Route path="/assistir/:id" element={<AssistirAula />} />
          </Routes>
        ) : (
          <main className={styles.main}>
            <div className={styles.mainInner}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cursos" element={<MeusCursos />} />
                <Route path="/conquistas" element={<Conquistas />} />
                <Route path="/certificados" element={<Certificados />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        )}
      </div>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  // Sem sessão ativa: só Login/Cadastro ficam acessíveis.
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Autenticado: as configurações só carregam dentro do shell logado.
  return (
    <SettingsProvider>
      <AppShell />
    </SettingsProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </ThemeProvider>
  );
}
