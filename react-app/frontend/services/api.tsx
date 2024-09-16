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

const apiRequest = async (path: string, method: string = "GET", data?: object): Promise<ApiResponse | null> => {
  try {
    const options: RequestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    if (data && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(path, options);

    const contentType = response.headers.get("Content-Type");
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
};
export { apiRequest };
