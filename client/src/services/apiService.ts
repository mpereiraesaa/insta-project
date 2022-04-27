import CONFIG from "../helpers/config";

const { BASE_URL } = CONFIG;

async function request<TResponse>(
  url: string,
  config?: any
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
  ) => request<TResponse>(url, { method: 'POST', body: data }),
  get: <TResponse>(url: string) => request<TResponse>(url),
};

interface IAPIService {
  auth<TResponse>(redirectUri: string, code: string): Promise<TResponse | undefined>;
  info<TData>(): Promise<TData | undefined>;
}

const apiService: IAPIService = {
  auth<TResponse>(redirectUri: string, code: string) {
    return api.post<any, TResponse>(BASE_URL + 'connect', { redirectUri, code });
  },
  info<TData>() {
    return api.get<TData>(BASE_URL + 'info');
  },
};

export default apiService;
