'use client';

import React, { useEffect, useState } from 'react';
import { SiteStateProvider } from '../lib/saved-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomePopup from '../components/WelcomePopup';

const WELCOME_DISMISSED_KEY = 'all-things-school-welcome-dismissed';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(true);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(WELCOME_DISMISSED_KEY) === '1';
    } catch {
      // storage unavailable
    }
    setMounted(true);
    setShowWelcomePopup(!dismissed);
  }, []);

  const handleCloseWelcome = () => {
    try {
      window.localStorage.setItem(WELCOME_DISMISSED_KEY, '1');
    } catch {
      // storage unavailable
    }
    setShowWelcomePopup(false);
  };

  return (
    <SiteStateProvider>
      <div className="min-h-screen bg-[#F5EFE6] flex flex-col text-[#333333] selection:bg-[#F47C7C]/30 selection:text-[#1F2A44]">
        {mounted && (
          <WelcomePopup
            isOpen={showWelcomePopup}
            onClose={handleCloseWelcome}
          />
        )}
        <Header onOpenWelcome={() => setShowWelcomePopup(true)} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </SiteStateProvider>
  );
}
