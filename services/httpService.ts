import axios from "axios";

const apiEndpoint = "http://localhost:8000";

class HttpServices {
  static http = axios.create({
    baseURL: apiEndpoint,
  });
}

export default HttpServices;
