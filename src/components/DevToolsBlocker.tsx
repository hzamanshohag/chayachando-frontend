import { useEffect } from "react";

declare global {
  interface Window {
    __devtoolsOpen?: boolean;
  }
}

const DevToolsBlocker = () => {
  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;
      if (widthThreshold || heightThreshold) {
        window.open("", "_self")?.close(); // Try to close tab
        window.location.href = "about:blank"; // Fallback: redirect to blank
      }
    };

    const interval = setInterval(detectDevTools, 1000);

    // Disable Right Click
    const disableRightClick = (e:any) => e.preventDefault();
    window.addEventListener("contextmenu", disableRightClick);

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
    const keyBlocker = (e:any) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) || // Ctrl+Shift+I/C/J
        (e.ctrlKey && e.key === "u") // Ctrl+U
      ) {
        e.preventDefault();
        window.open("", "_self")?.close();
        window.location.href = "about:blank";
      }
    };
    window.addEventListener("keydown", keyBlocker);

    return () => {
      clearInterval(interval);
      window.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("keydown", keyBlocker);
    };
  }, []);

useEffect(() => {
  const detectDevTools = () => {
    const threshold = 160;
    const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
    const heightDiff = Math.abs(window.outerHeight - window.innerHeight);

    if (widthDiff > threshold || heightDiff > threshold) {
      window.location.replace("about:blank");
    }
  };

  const debuggerTrap = () => {
    const start = performance.now();
    debugger; // Triggers delay if DevTools is open
    const end = performance.now();
    if (end - start > 100) {
      window.location.replace("about:blank");
    }
  };

  const consoleCheck = () => {
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        window.location.replace("about:blank");
      },
    });
    // Trigger console inspection
    console.log("%c", element);
  };

  const interval1 = setInterval(detectDevTools, 1000);
  const interval2 = setInterval(debuggerTrap, 500);
  const interval3 = setInterval(consoleCheck, 1000);

  return () => {
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval3);
  };
}, []);

  return null;
};


export default DevToolsBlocker;
