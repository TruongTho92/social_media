import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  headers: {},
});

export default apiClient;
