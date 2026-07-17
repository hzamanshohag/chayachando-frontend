import { useEffect, useState } from "react";

const DevToolsBlockerChrome: React.FC = () => {
  const [devToolsOpen, setDevToolsOpen] = useState<boolean>(false);

  const checkDevTools = (): boolean => {
    // Method 1: Check window dimensions
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    // Method 2: Debugger time detection
    const start = new Date().getTime();
    debugger;
    const end = new Date().getTime();
    const debuggerTime = end - start > 100;

    // Method 3: Console trap detection
    const consoleCheck = ((): boolean => {
      const original = console.log;
      let isOpened = false;

      const trap = {
        toString: () => {
          isOpened = true;
          return "";
        },
      };

      console.log(trap);
      console.log = original;

      return isOpened;
    })();

    return widthThreshold || heightThreshold || debuggerTime || consoleCheck;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const isOpen =
        checkDevTools() || (window as any)?.Firebug?.firebug?.isInitialized;

      if (isOpen) {
        setDevToolsOpen(true);
        document.body.innerHTML =
          "<h1>Developer Tools Detected</h1><p>This website is closed for security reasons.</p>";
        window.location.href = "about:blank";

        try {
          window.open("", "_self");
          window.close();
        } catch (err) {
          console.error("Window close failed:", err);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default DevToolsBlockerChrome;
