export interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
}

const get = (name: string, source = document.cookie): string | null => {
  const cookies = source.split("; ");
  const cookie = cookies.find((c) => c.startsWith(name));
  const [, value] = cookie?.split("=") ?? [];

  return cookie ? value : null;
};

const set = (name: string, value: string, options: CookieOptions = {}): void => {
  const { path, domain, expires, maxAge, secure, httpOnly, sameSite } = options;

  const cookieValue = [
    `${name}=${value}`,
    path ? `path=${path}` : "",
    domain ? `domain=${domain}` : "",
    expires ? `expires=${expires.toUTCString()}` : "",
    maxAge ? `max-age=${maxAge}` : "",
    secure ? "secure" : "",
    httpOnly ? "httpOnly" : "",
    sameSite ? `sameSite=${sameSite}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  document.cookie = cookieValue;
};

const remove = (name: string, path?: string): void => {
  set(name, "", { maxAge: 0, path });
};

const util = {
  get,
  set,
  remove,
};

export default util;
