import fetch from "node-fetch";

async function request<TResponse>(
  url: string,
  config?: any
): Promise<TResponse> {
  try {
    const response = await fetch(url, config);
    return await response.json() as TResponse;
  }
  catch (error) {
    let errorData = error.response;
    let errorCode = errorData.data.error.code;
    let errorType = errorData.data.error.type;
    let errorMessage = errorData.data.error.message;
    throw new Error(
      `[Instagram API Error] Error Code: ${errorCode}, Error Type: ${errorType}, Error Message: ${errorMessage}`
    );
  }
}

const api = {
  post: <TBody extends BodyInit, TResponse>(
    url: string,
    data: TBody
  ) => request<TResponse>(url, { method: 'POST', body: data }),
  get: <TResponse>(url: string) => request<TResponse>(url),
};

export default api;
