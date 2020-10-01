import { callApi } from 'helpers/api.helper';
import { history } from '@helpers/history.helper';
import { IUserData } from '../models/IUserData';
import { IBulletin } from '../models/IBulletin';

export const getUserInfo = async () => {
  const response = await callApi({
    endpoint: '/api/user/info',
    type: 'GET'
  });
  return response.json();
};

export const updateUserInfo = async (user: IUserData) => {
  const response = await callApi({
    type: 'PUT',
    endpoint: `/api/user/update`,
    requestData: user
  });
  return response.json();
};

export const addBulletin = async (bulletin: IBulletin) => {
  const response = await callApi({
    type: 'POST',
    endpoint: '/api/bulletin/create',
    requestData: bulletin
  });
  return response.json();
};

export function forwardHome() {
  history.push('/');
}

export function forwardBulletins() {
  history.push('/bulletins');
}
