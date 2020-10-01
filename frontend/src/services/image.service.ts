import { callApi } from 'helpers/api.helper';

export const uploadImage = async image => {
  const response = await callApi({
    endpoint: '/api/image/upload',
    type: 'POST',
    attachment: image
  });
  return response.json();
};
