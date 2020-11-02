import axios from "axios";

export const mediaToAWS = (mediaFile) => {
  debugger;
  /*
    const { data } = await axios.post('/api/upload/media-upload', mediaFile)
    */
  return axios.post("/api/upload/media-upload", mediaFile);
};
