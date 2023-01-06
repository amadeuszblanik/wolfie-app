const util = (apiUrl: string, values?: Record<string, string>): string => {
  Object.entries(values || {}).forEach(([key, value]) => {
    apiUrl = apiUrl.replace(`:${key}`, value);
  });

  return apiUrl;
};

export default util;
