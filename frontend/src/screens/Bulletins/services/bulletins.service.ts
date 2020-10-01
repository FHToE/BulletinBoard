import { callApi } from 'helpers/api.helper';

export const getBulletins = async (from: Number) => {
  const response = await callApi({
    endpoint: `/api/bulletin/${from}`,
    type: 'GET'
  });
  return response.json();
};
