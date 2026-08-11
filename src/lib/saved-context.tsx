'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type TabId = 'Home' | 'Classroom Decor' | 'Organization' | 'Nails' | 'Saved';

interface SiteStateValue {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  saved: Record<string, boolean>;
  likesDelta: Record<string, number>;
  savedCount: number;
  isSaved: (id: string) => boolean;
  getLikes: (id: string, baseLikes: number) => number;
  toggleSave: (id: string) => void;
}

const STORAGE_KEY = 'all-things-school-state-v1';

const SiteStateContext = createContext<SiteStateValue | null>(null);

export function SiteStateProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('Home');
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [likesDelta, setLikesDelta] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        activeTab?: TabId;
        saved?: Record<string, boolean>;
        likesDelta?: Record<string, number>;
      };
      if (parsed.activeTab) setActiveTab(parsed.activeTab);
      if (parsed.saved) setSaved(parsed.saved);
      if (parsed.likesDelta) setLikesDelta(parsed.likesDelta);
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ activeTab, saved, likesDelta })
      );
    } catch {
      // storage unavailable
    }
  }, [activeTab, saved, likesDelta]);

  const isSaved = useCallback((id: string) => !!saved[id], [saved]);

  const getLikes = useCallback(
    (id: string, baseLikes: number) => baseLikes + (likesDelta[id] ?? 0),
    [likesDelta]
  );

  const toggleSave = useCallback(
    (id: string) => {
      const wasSaved = !!saved[id];
      setSaved(prev => ({ ...prev, [id]: !wasSaved }));
      setLikesDelta(prev => ({ ...prev, [id]: (prev[id] ?? 0) + (wasSaved ? -1 : 1) }));
    },
    [saved]
  );

  const savedCount = useMemo(
    () => Object.values(saved).filter(Boolean).length,
    [saved]
  );

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      saved,
      likesDelta,
      savedCount,
      isSaved,
      getLikes,
      toggleSave,
    }),
    [activeTab, saved, likesDelta, savedCount, isSaved, getLikes, toggleSave]
  );

  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>;
}

export function useSiteState(): SiteStateValue {
  const ctx = useContext(SiteStateContext);
  if (!ctx) throw new Error('useSiteState must be used within SiteStateProvider');
  return ctx;
}
