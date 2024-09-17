type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  credentials?: RequestCredentials;
};

type ApiResponse = {
  data: object;
  success: boolean;
  message?: string;
};

const getData = async (path: string, options: RequestOptions = { method: "GET" }): Promise<ApiResponse | null> => {
  try {
    const response = await fetch(path, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const fetcher = async (url: string, data: object) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
export { getData, fetcher };
