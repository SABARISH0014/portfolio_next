"use client";

import React, { createContext, useContext, useState } from "react";

interface TerminalContextType {
  isTerminalMode: boolean;
  setTerminalMode: (value: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isTerminalMode, setTerminalMode] = useState(false);

  return (
    <TerminalContext.Provider value={{ isTerminalMode, setTerminalMode }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
