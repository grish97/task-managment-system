import auth from './AuthService';
import { buildURL } from 'configs/configs';
import { IHTTPServiceOption, IResponseResult } from '@services';

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

  /**
   * Send request by method and return response or catched error
   * @param {IHTTPServiceOption} options
   * @param {any} body
   * @returns {Promise<IResponseResult>}
   */
  public static async send(options: IHTTPServiceOption, body: any = {}): Promise<IResponseResult> {
    let executeMethod: any = () => {};

    switch (options.method) {
      case 'GET':
        executeMethod = () => this.get(options);
        break;
      case 'POST':
        executeMethod = () => this.post(options, body);
        break;
      case 'PUT':
        executeMethod = () => this.put(options, body);
        break;
      case 'DELETE':
        executeMethod = () => this.delete(options);
        break;
    }

    try {
      const response = await executeMethod();
      const responseResult: IResponseResult = {
        response: response,
        redirect: false,
        message: '',
        success: true,
      };

      // Check authentication
      if ([401, 403].includes(response.status)) {
        // this data can use if we must integrate refresh token
        responseResult.redirect = true;
        responseResult.success = false;
        responseResult.message = response.statusText;

        // remove token from storage and reload
        auth.logout();
        window.location.reload();
      }

      return responseResult;
    } catch (error: any) {
      return {
        redirect: false,
        success: false,
        message: error.message,
      };
    }
  }

  public static async get(options: IHTTPServiceOption): Promise<Response> {
    const url = buildURL(options.url);
    return await fetch(url, {
      method: options.method,
      headers: this.getHeaders(),
    });
  }

  public static async post(
    options: IHTTPServiceOption,
    body: any,
    additionHeaders: any = {}
  ): Promise<Response> {
    const url = buildURL(options.url);

    return await fetch(url, {
      method: options.method,
      body: JSON.stringify(body),
      headers: {
        ...this.getHeaders(),
        ...additionHeaders,
      },
    });
  }

  public static async put(
    options: IHTTPServiceOption,
    body: any,
    additionalHeaders: any = {}
  ): Promise<Response> {
    const url = buildURL(options.url);

    return await fetch(url, {
      method: options.method,
      body: JSON.stringify(body),
      headers: {
        ...this.getHeaders(),
        ...additionalHeaders,
      },
    });
  }

  public static async delete(
    options: IHTTPServiceOption,
    additionHeaders: any = {}
  ): Promise<Response> {
    const url = buildURL(options.url);

    return await fetch(url, {
      method: options.method,
      headers: {
        ...this.getHeaders(),
        ...additionHeaders,
      },
    });
  }
}

export default HTTPService;
