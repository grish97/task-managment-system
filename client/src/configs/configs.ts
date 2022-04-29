export function buildURL(path: string): string {
  const apiDomain = process.env.REACT_APP_API_DOMAIN;

  return `${apiDomain}/${path}`;
}
