import { useEffect, useState } from "react";

const ExtensionBlocker: React.FC = () => {
  const [extensionDetected, setExtensionDetected] = useState(false);

  const EXTENSION_ID = "ofgdcdohlhjfdhbnfkikfeakhpojhpgm";

  const checkExtensionPresence = () => {
    const manifestUrl = `chrome-extension://${EXTENSION_ID}/manifest.json`;

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = manifestUrl;

    iframe.onload = () => {
      setExtensionDetected(true);
      document.body.removeChild(iframe);
    };

    iframe.onerror = () => {
      // Extension not found
      document.body.removeChild(iframe);
    };

    document.body.appendChild(iframe);
  };

  const checkRightClickOverride = () => {
    let rightClickBlocked = true;

    const testDiv = document.createElement("div");
    testDiv.style.display = "none";

    testDiv.addEventListener("contextmenu", (e) => {
      rightClickBlocked = false;
      e.preventDefault();
    });

    document.body.appendChild(testDiv);

    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    testDiv.dispatchEvent(event);
    document.body.removeChild(testDiv);

    if (!rightClickBlocked) {
      setExtensionDetected(true);
    }
  };

  useEffect(() => {
    // Run checks immediately
    checkExtensionPresence();
    checkRightClickOverride();

    // Continue checking in intervals
    const interval = setInterval(() => {
      checkExtensionPresence();
      checkRightClickOverride();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (extensionDetected) {
      // Clear DOM
      document.documentElement.innerHTML = "";

      // Redirect and attempt to close
      setTimeout(() => {
        try {
          window.location.replace("about:blank");
          window.open("", "_self");
          window.close();
        } catch (e) {
          console.warn("Window close failed.");
        }
      }, 200);
    }
  }, [extensionDetected]);

  return extensionDetected ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        color: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Extension Detected</h1>
        <p>
          Please disable <strong>"Enable Right Click"</strong> extension to
          access this website.
        </p>
      </div>
    </div>
  ) : null;
};

export default ExtensionBlocker;
