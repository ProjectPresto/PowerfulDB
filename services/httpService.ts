import axios from "axios";

const apiEndpoint = "http://localhost:8000";

class HttpService {
  static http = axios.create({
    baseURL: apiEndpoint,
  });

  static setAuthHeader(accessToken: string): void {
    axios.defaults.headers.common["authorization"] = `JWT ${accessToken}`;
  }

  static resetAuthHeader() {
    axios.defaults.headers.common["authorization"] = false;
  }
}

export default HttpService;
