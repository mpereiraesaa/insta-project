import CONFIG from "../helpers/config";

const { DEFAULT_HEADERS } = CONFIG;
const { REACT_APP_BASE_URL } = process.env;

async function request<TResponse>(
  url: string,
  config?: RequestInit
): Promise<TResponse | undefined> {
  try {
    const response = await fetch(url, config);
    return await response.json() as TResponse;
  }
  catch (error: any) {
    throw new Error(error.message);
  }
}

const api = {
  post: <TBody extends BodyInit, TResponse>(
    url: string,
    data: TBody
  ) => request<TResponse>(url, { method: 'POST', body: JSON.stringify(data), headers: DEFAULT_HEADERS, credentials: "include" }),
  get: <TResponse>(url: string) => request<TResponse>(url, { credentials: "include" }),
};

interface IAPIService {
  auth<TResponse>(redirectUri: string, code: string): Promise<TResponse | undefined>;
  info<TData>(): Promise<TData | undefined>;
}

const apiService: IAPIService = {
  auth<TResponse>(redirectUri: string, code: string) {
    return api.post<any, TResponse>(REACT_APP_BASE_URL + 'connect', { redirectUri, code });
  },
  info<TData>() {
    return api.get<TData>(REACT_APP_BASE_URL + 'info');
  },
};

export default apiService;
