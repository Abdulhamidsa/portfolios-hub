import { endPoints } from "../config/apiEndpoints";
import axiosInstance from "./axiosConfig";
import { createContext, useState, useEffect, useContext } from "react";

export type User = {
  id: string;
  friendlyId: string;
  userRole: string;
};

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endPoints.user.auth.checkAuth);
      console.log(response);
      if (response.data.result) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Failed to check auth:", error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    axiosInstance.post(endPoints.user.auth.logout);
  };

  return <AuthContext.Provider value={{ user, isLoggedIn, isLoading, setUser, logout }}>{children}</AuthContext.Provider>;
};
