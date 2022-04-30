import apiRoutes from 'configs/api-routes';
import { http } from 'services';

import { INewTask } from '@task';

type TResponse = {
  success: boolean;
  message: string;
  data: any;
};

type TFailResponse = {
  success: boolean;
  message: string;
};

class TaskService {
  /**
   * Get all tasks
   * @returns {Promise<any>}
   */
  public static async getAll(): Promise<any> {
    try {
      const response = await http.get(apiRoutes.APP_TASK_GET_ALL);

      return this.responseResult(response);
    } catch (error: any) {
      return this.failResult(error.message);
    }
  }

  /**
   * Create new task
   * @params {INewTask} date
   * @returns {Promise<any>}
   */
  public static async create(date: INewTask): Promise<any> {
    try {
      const response = await http.post(apiRoutes.APP_TASK_CREATE, date);
      return this.responseResult(response);
    } catch (error: any) {
      return this.failResult(error.message);
    }
  }

  /**
   * Update task by id
   * @params {string} id
   * @params {Partial<INewTask>} date
   * @returns {Promise<any>}
   */
  public static async update(id: string, date: Partial<INewTask>): Promise<any> {
    try {
      const options = apiRoutes.APP_TASK_UPDATE;
      options.url = options.url.replace(':id', id);

      const response = await http.put(options, date);

      return this.responseResult(response);
    } catch (error: any) {
      return this.failResult(error.message);
    }
  }

  /**
   * Delete task by id
   * @params {string} id
   * @returns {Promise<any>}
   */
  public static async delete(id: string): Promise<any> {
    try {
      const options = apiRoutes.APP_TASK_DELETE;
      options.url = options.url.replace(':id', id);

      const response = await http.delete(options);

      return this.responseResult(response);
    } catch (error: any) {
      return this.failResult(error.message);
    }
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

  private static failResult(message: string): TFailResponse {
    return {
      success: false,
      message: message,
    };
  }
}

export default TaskService;
