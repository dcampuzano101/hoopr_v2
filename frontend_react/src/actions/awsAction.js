import axios from 'axios';

export const mediaToAWS = (mediaFile) => {
  return axios.post('/api/upload/media-upload', mediaFile);
};
