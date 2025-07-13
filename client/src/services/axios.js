import axios from "axios";

const instance = axios.create({
  baseURL: "https://news-website-n0kn.onrender.com/api",
});

export default instance;
