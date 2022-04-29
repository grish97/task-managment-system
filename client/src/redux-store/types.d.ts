declare module '@redux-store' {
  interface IRootStore {
    auth: IAuthStore;
  }

  interface IAuthStore {
    isLogged: boolean;
    userData: any;
    accessToken: string;
  }
}
