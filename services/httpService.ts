import axios from 'axios';

const apiEndpoint = 'http://localhost:8000';

class HttpService {
	static http = axios.create({
		baseURL: apiEndpoint
	});

	static setAuthHeader(accessToken: string): void {
		this.http.defaults.headers.common['authorization'] = `JWT ${accessToken}`;
	}

	static resetAuthHeader() {
		this.http.defaults.headers.common['authorization'] = false;
	}

	static setHeader(headerName: string, value: any) {
		this.http.defaults.headers.common[headerName] = value;
	}
}

export default HttpService;
