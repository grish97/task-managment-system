import auth from './AuthService';
import { buildURL } from 'configs/configs';
import { IHTTPServiceOption } from '@services';

class HTTPService {
  public static getHeaders(customHeader: any = {}) {
    const user = auth.user();

    if (user && user.accessToken) {
      return {
        ...customHeader,
        'x-access-token': user.accessToken,
        'Content-Type': 'application/json',
      };
    } else {
      return { ...customHeader };
    }
  }

  public static get(options: IHTTPServiceOption): Promise<Response> {
    const url = buildURL(options.url);
    return fetch(url, {
      method: options.method,
      headers: this.getHeaders(),
    });
  }

  public static post(
    options: IHTTPServiceOption,
    body: any,
    additionHeaders: any = {}
  ): Promise<Response> {
    const url = buildURL(options.url);

    return fetch(url, {
      method: options.method,
      body: JSON.stringify(body),
      headers: {
        ...this.getHeaders(),
        ...additionHeaders,
      },
    });
  }

  public static put(
    options: IHTTPServiceOption,
    body: any,
    additionalHeaders: any = {}
  ): Promise<Response> {
    const url = buildURL(options.url);

    return fetch(url, {
      method: options.method,
      body: JSON.stringify(body),
      headers: {
        ...this.getHeaders(),
        ...additionalHeaders,
      },
    });
  }

  public static delete(options: IHTTPServiceOption, additionHeaders: any = {}): Promise<Response> {
    const url = buildURL(options.url);

    return fetch(url, {
      method: options.method,
      headers: {
        ...this.getHeaders(),
        ...additionHeaders,
      },
    });
  }
}

export default HTTPService;
