const BASE_URL = 'http://localhost:8000/api/';

async function request<TResponse>(
  url: string,
  config?: any
): Promise<TResponse | undefined> {
  try {
    const response = await fetch(url, config);
    return await response.json() as TResponse;
  }
  catch (error: any) {
    console.error(error);
  }
}

const api = {
  post: <TBody extends BodyInit, TResponse>(
    url: string,
    data: TBody
  ) => request<TResponse>(url, { method: 'POST', body: data }),
  get: <TResponse>(url: string) => request<TResponse>(url),
};

interface IAPIService {
  auth(redirectUri: string, code: string): Promise<void>;
  info<TData>(): Promise<TData | undefined>;
}

const apiService: IAPIService = {
  auth(redirectUri: string, code: string) {
    return api.post<any, any>(BASE_URL + 'connect', { redirectUri, code });
  },
  info<TData>() {
    return api.get<TData>(BASE_URL + 'info');
  },
};

export default apiService;
