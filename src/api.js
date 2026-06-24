import axios from "axios";

const API = axios.create({
  baseURL: "https://paginationbe.vercel.app",
});

export default API;
