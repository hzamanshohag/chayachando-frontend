import { useEffect } from "react";

const ChromeOnlyBlocker: React.FC = () => {
  const isRealChrome = async (): Promise<boolean> => {
    const userAgent = navigator.userAgent.toLowerCase();

    // Reject if it's Firefox, Safari, Opera, Edge
    const blocked =
      userAgent.includes("edg") ||
      userAgent.includes("edge") ||
      userAgent.includes("opr") ||
      userAgent.includes("opera") ||
      userAgent.includes("firefox") ||
      (/safari/.test(userAgent) && !/chrome/.test(userAgent));

    // Reject Brave explicitly
    const isBrave =
      (navigator as any).brave && (await (navigator as any).brave.isBrave());

    // Final condition: Must be Chrome and NOT any blocked browser
    return /chrome/.test(userAgent) && !blocked && !isBrave;
  };

  const closeSite = () => {
    document.documentElement.innerHTML = "";
    setTimeout(() => {
      window.location.replace("about:blank");
      try {
        window.open("", "_self");
        window.close();
      } catch (e) {
        console.warn("Could not close window.");
      }
    }, 100);
  };

  useEffect(() => {
    (async () => {
      const allowed = await isRealChrome();
      if (!allowed) {
        closeSite();
      }
    })();
  }, []);

  return null;
};

export default ChromeOnlyBlocker;
