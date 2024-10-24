import axiosInstance from "../config/axiosConfig";

export type ApiResponse<T> = {
  data: T;
  result: boolean;
  message: string;
};
export const getData = async <T,>(path: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(path, {
      headers: {
        credentials: "include",
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Unexpected error: ${(error as Error).message}`);
  }
};

export const fetcher = async <T,>(url: string, data: object): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`Unexpected error: ${(error as Error).message}`);
  }
};
