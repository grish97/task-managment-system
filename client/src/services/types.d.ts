declare module '@services' {
  interface IHTTPServiceOption {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  }

  interface IResponseResult {
    response?: Response;
    success: boolean;
    redirect: boolean;
    message: string;
  }
}
