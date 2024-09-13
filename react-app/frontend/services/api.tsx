// interface PersonalInfo {}

// interface User {
//   _id: string;
//   friendlyId: string;
//   personalInfo: PersonalInfo;
//   userType: string;
//   approved: boolean;
//   // Add other fields as needed
// }

// interface Data {
//   status: string;
//   user: User;
// }



type ApiResponse = {
  success: boolean;
  message: string;
};

interface RequestOptions extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit | null;
}

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

const fetcher = (url: string, data: object) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  });
};


export { getData ,fetcher};
