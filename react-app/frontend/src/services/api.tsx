import { axiosInstance } from "../api/axiosConfig";

export type ApiResponse<T> = {
  data: T;
  result: boolean;
  message: string;
};

export async function getData<T>(path: string): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(path);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${(error as Error).message}`);
  }
}
export const fetcher = async (url: string, data: object): Promise<ApiResponse<object>> => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
