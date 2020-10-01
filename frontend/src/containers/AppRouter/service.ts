import { callApi } from '@helpers/api.helper';

export const getCurrentUser = async () => {
  const result = await callApi({
    endpoint: '/api/user/me',
    type: 'GET'
  });

  return result.json();
};
