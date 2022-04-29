import auth from './AuthService';

class HTTPService {
  public getHeaders(customHeader: any = {}) {
    const user = auth.user();

    if (user && user.accessToken) {
      return {
        ...customHeader,
        'x-access-token': user.accessToken,
      };
    } else {
      return {};
    }
  }
}

export default HTTPService;
