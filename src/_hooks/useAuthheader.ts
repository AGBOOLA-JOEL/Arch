export const setGlobalAuthHeader = (token: string | null) => {
  if (token) {
    window.fetch = ((originalFetch) => {
      return (...args) => {
        const [resource, config] = args;
        const modifiedConfig = {
          ...config,
          headers: {
            ...config?.headers,
            Authorization: `Bearer ${token}`,
          },
        };
        return originalFetch(resource, modifiedConfig);
      };
    })(window.fetch);
  } else {
    window.fetch = ((originalFetch) => {
      return (...args) => {
        const [resource, config] = args;
        const modifiedConfig = {
          ...config,
          headers: {
            ...config?.headers,
            Authorization: "",
          },
        };
        return originalFetch(resource, modifiedConfig);
      };
    })(window.fetch);
  }
};
