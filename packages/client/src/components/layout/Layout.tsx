import React from 'react';
import { Header } from './Header';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Páginas que no necesitan el wrapper de bg-gray-50
  const pagesWithOwnBg = ['/login', '/register', '/register-complete'];
  const hasOwnBg = pagesWithOwnBg.includes(location.pathname);
  
  return (
    <div className={hasOwnBg ? "min-h-screen" : "min-h-screen bg-gray-50"}>
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};