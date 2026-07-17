import { useEffect } from "react";

const DevToolsBlockerBrave: React.FC = () => {
  const detectDevTools = (): boolean => {
    // Method 1: Size threshold detection (docked devtools)
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    // Method 2: Debugger execution delay
    const start = performance.now();
    debugger;
    const end = performance.now();
    const debuggerTime = end - start > 100;

    // Method 3: Console trap
    let consoleOpened = false;
    const element = {
      get value() {
        consoleOpened = true;
        return "";
      },
    };
    // @ts-ignore
    console.log("%c", element);

    return widthThreshold || heightThreshold || debuggerTime || consoleOpened;
  };

  useEffect(() => {
    const blockAccess = () => {
      // Clear DOM instantly
      document.documentElement.innerHTML = "";
      document.write(
        "<h1 style='color:red;text-align:center;margin-top:20vh;'>DevTools Detected</h1><p style='text-align:center;'>This website is unavailable while Developer Tools are open.</p>"
      );
      document.close();

      // Give the browser a moment, then redirect and try to close
      setTimeout(() => {
        try {
          window.location.replace("about:blank");
          window.open("", "_self");
          window.close();
        } catch (e) {
          console.warn("Window could not be closed.");
        }
      }, 200); // slight delay to ensure proper redirect
    };

    // Initial detection (before anything else loads)
    if (detectDevTools()) {
      blockAccess();
      return;
    }

    // Check every 500ms
    const interval = setInterval(() => {
      if (detectDevTools()) {
        blockAccess();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default DevToolsBlockerBrave;
