const util = (apiUrl: string, ids?: Record<string, string>, queryParams?: Record<string, string>): string => {
  Object.entries(ids || {}).forEach(([key, value]) => {
    apiUrl = apiUrl.replace(`:${key}`, value);
  });

  const query = Object.entries(queryParams || {})
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return apiUrl + (query ? `?${query}` : "");
};

export default util;
