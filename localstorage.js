
  // Enable localStorage in Puppeteer
  await page.evaluateOnNewDocument(() => {

    document.cookie = '';

    // Polyfill localStorage in the context of the page
    window.localStorage = (() => {
      
      let store = {};
      
      return {
        getItem(key) {
          return store[key] || null;
        },
        setItem(key, value) {
          store[key] = value.toString();
        },
        removeItem(key) {
          delete store[key];
        },
        clear() {
          store = {};
        },
      };
    })();
  });