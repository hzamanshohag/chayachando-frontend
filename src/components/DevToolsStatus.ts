import { useState, useEffect } from "react";
import devtools from "devtools-detect";

export function useDevToolsStatus(): boolean {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState<boolean>(
    devtools.isOpen
  );

  useEffect(() => {
    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen: boolean }>;
      setIsDevToolsOpen(customEvent.detail.isOpen);
    };

    window.addEventListener("devtoolschange", handleChange);
    return () => {
      window.removeEventListener("devtoolschange", handleChange);
    };
  }, []);

  return isDevToolsOpen;
}
