import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-salvus-test-production.up.railway.app/api/",
});

export default instance;
