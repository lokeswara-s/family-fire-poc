import React from 'react';
import { TopNavigation } from '../Navigation/TopNavigation';
import { BottomNavigation } from '../Navigation/BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <TopNavigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};