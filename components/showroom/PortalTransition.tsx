"use client";

import { createContext, useContext } from "react";

const PortalContext = createContext({ unused: true });

export function usePortal() {
  return useContext(PortalContext);
}

export function PortalProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
