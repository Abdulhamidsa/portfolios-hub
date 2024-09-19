import { axiosInstance } from "../api/axiosConfig";

export type ApiResponse<T> = {
  data: T;
  result: boolean;
  message: string;
};

async function getData<T>(path: string): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(path);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${(error as Error).message}`);
  }
}

const fetcher = async (url: string, data: object): Promise<ApiResponse<object>> => {
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
