'use client'

import React, { createContext, useState, useContext, ReactNode, useRef, useCallback } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  initiateLoading: (delayMs: number) => void;
  completeLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const initiateLoading = useCallback((delayMs: number) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    timerIdRef.current = setTimeout(() => {
      setIsLoading(true);
      timerIdRef.current = null;
    }, delayMs);
  }, []);

  const completeLoading = useCallback(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, initiateLoading, completeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 