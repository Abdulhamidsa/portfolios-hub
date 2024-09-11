interface PersonalInfo {}

interface User {
  _id: string;
  friendlyId: string;
  personalInfo: PersonalInfo;
  userType: string;
  approved: boolean;
  // Add other fields as needed
}

interface Data {
  status: string;
  user: User;
}
interface RequestOptions extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit | null;
}

const getData = async (path: string, options: RequestOptions = { method: "GET" }): Promise<data | null> => {
  try {
    const response = await fetch(path, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getData };
