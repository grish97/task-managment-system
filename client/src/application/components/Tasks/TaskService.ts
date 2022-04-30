import apiRoutes from 'configs/api-routes';
import { http } from 'services';

import { INewTask } from '@task';
import { IResponseResult } from '@services';

type TResponse = {
  success: boolean;
  message: string;
  data: any;
};

type TFailResponse = {
  success: boolean;
  message: string;
  redirect: boolean;
};

class TaskService {
  /**
   * Get all tasks
   * @returns {Promise<any>}
   */
  public static async getAll(): Promise<any> {
    const responseRes = await http.send(apiRoutes.APP_TASK_GET_ALL);

    return this.sendResult(responseRes);
  }

  /**
   * Create new task
   * @params {INewTask} date
   * @returns {Promise<any>}
   */
  public static async create(date: INewTask): Promise<any> {
    const responseRes = await http.send(apiRoutes.APP_TASK_CREATE, date);

    return this.sendResult(responseRes);
  }

  /**
   * Update task by id
   * @params {string} id
   * @params {Partial<INewTask>} date
   * @returns {Promise<any>}
   */
  public static async update(id: string, date: Partial<INewTask>): Promise<any> {
    const options = { ...apiRoutes.APP_TASK_UPDATE };
    options.url = options.url.replace(':id', id);

    const responseRes = await http.send(options, date);

    return this.sendResult(responseRes);
  }

  /**
   * Delete task by id
   * @params {string} id
   * @returns {Promise<any>}
   */
  public static async delete(id: string): Promise<any> {
    const options = { ...apiRoutes.APP_TASK_DELETE };
    options.url = options.url.replace(':id', id);

    const responseRes = await http.send(options);

    return this.sendResult(responseRes);
  }

  /**
   * Send result depending on response result
   * @param responseResult
   */
  private static sendResult(responseResult: IResponseResult) {
    if (responseResult.success) {
      return this.responseResult(responseResult.response as Response);
    }

    return this.failResult(responseResult);
  }

  /**
   * Parsed response result
   * @param {Response} response
   * @returns {Promise<TResponse>}
   */
  private static async responseResult(response: Response): Promise<TResponse> {
    const result: TResponse = {
      success: false,
      message: '',
      data: [],
    };

    if (response.ok) {
      result.success = true;
      result.data = await response.json();
    } else {
      result.success = false;
      result.message = await response.text();
    }

    return result;
  }

  private static failResult(result: IResponseResult): TFailResponse {
    return {
      success: false,
      message: result.message,
      redirect: result.redirect,
    };
  }
}

export default TaskService;
