declare module '@services' {
  interface IHTTPServiceOption {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  }
}
