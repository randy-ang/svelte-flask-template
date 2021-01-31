import App from "../shared/App.svelte";

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js");

// because hydrate cannot be true, children of #app from ssr will not be replaced, instead only appended
// current temp fix is to remove innerHtml & rerender on client
// impact performance-wise, but at least can ssr now
document.getElementById("app").innerHTML = "";

const app = new App({
  target: document.getElementById("app"),
  // for some reason, when hydrate = true, cannot csr due to 'Cannot read property 'parentNode' of undefined' (Routes component by svelte-navigator)
  // hydrate: true,
});

export default app;
