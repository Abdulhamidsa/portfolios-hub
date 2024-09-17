// type RequestOptions = {
//   method?: string;
//   headers?: Record<string, string>;
//   body?: string;
//   credentials?: RequestCredentials;
// };

type ApiResponse = {
  data: object;
  success: boolean;
  message?: string;
};

const getData = async (path: string): Promise<ApiResponse | null> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
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
      const errorData = await response.json();
      throw new Error(errorData.data || "An error occurred during the request");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
export { getData, fetcher };
