import axiosDefault from "axios";

const axios = axiosDefault.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
export default axios;
