import { buildURL } from 'configs/configs';

export const STORAGE_USER_KEY = 'authUser';

class AuthService {
  public async login(email: string, password: string) {
    const loginUrl = buildURL('auth/signin');
    const response = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.status === 200) {
      const result = await response.json();

      if (result.accessToken) {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(result));
      }

      return result;
    }

    const message = await response.text();

    return JSON.parse(message || '');
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_USER_KEY);
  }

  public user(): any {
    const userData = localStorage.getItem(STORAGE_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  public isLogged() {
    return Boolean(this.user());
  }
}
export default new AuthService();
