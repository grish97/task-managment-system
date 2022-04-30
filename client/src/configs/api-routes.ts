import { IHTTPServiceOption } from '@services';

type TApiRoutes = {
  [key in string]: IHTTPServiceOption;
};

export default {
  AUTH_LOGIN: {
    url: '/auth/login',
    method: 'POST',
  },
  APP_TASK_GET_ALL: {
    url: 'task',
    method: 'GET',
  },
  APP_TASK_CREATE: {
    url: 'task',
    method: 'POST',
  },
  APP_TASK_UPDATE: {
    url: 'task/:id',
    method: 'PUT',
  },
  APP_TASK_DELETE: {
    url: 'task/:id',
    method: 'DELETE',
  },
} as TApiRoutes;
