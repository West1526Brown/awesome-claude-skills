// register-sw.js
// Registers the service worker and wires up a custom "Install app" button.
// Call registerSW() once from your main script after the page loads.

export function registerSW() {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service workers are not supported in this browser.");
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service worker registered:", reg.scope))
      .catch((err) => console.error("Service worker registration failed:", err));
  });

  setupInstallPrompt();
}

// Capture Android's beforeinstallprompt so you can show your own install UI.
// Add a hidden button with id="install-button" somewhere in your page.
function setupInstallPrompt() {
  let deferredPrompt = null;
  const installButton = document.getElementById("install-button");

  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent Chrome's default mini-infobar; we'll prompt on our own button.
    event.preventDefault();
    deferredPrompt = event;
    if (installButton) installButton.hidden = false;
  });

  if (installButton) {
    installButton.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User install choice: ${outcome}`);
      deferredPrompt = null;
      installButton.hidden = true;
    });
  }

  window.addEventListener("appinstalled", () => {
    console.log("PWA installed.");
    if (installButton) installButton.hidden = true;
  });
}
