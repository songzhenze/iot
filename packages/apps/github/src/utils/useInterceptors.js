import { createBrowserHistory } from 'history';
import { DESTROY } from '../store';
import http from './http';

const history = createBrowserHistory();

let done = false;

const useInterceptors = store => {
  const { userState = {}, dispatch } = store;
  const { token } = userState;

  if (token && !done) {
    done = true;
    http.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Basic ${token}`;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      },
    );

    http.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              dispatch({ type: DESTROY });
              history.replace('/login');
              break;
            default:
          }
        }
        return Promise.reject(error.response);
      },
    );
  }
};

export default useInterceptors;
