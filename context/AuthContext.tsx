import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  getToken,
  setTokenLocalStorage,
} from "@/Provider/localStorageProvider";
import { toast } from "react-toastify";
import { IUser } from "@/models/auth";
import { loginByEmail, loginByToken, logoutByEmail } from "@/api/auth";
interface AuthContextType {
  user: IUser;
  login: (email: string, password: string) => void;
  logout: (email: string) => void;
  isLoadingLogin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: {} as IUser,
  login: () => {},
  logout: () => {},
  isLoadingLogin: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [token, setToken] = React.useState<string>("");
  const [isLoadingLogin, setIsLoadingLogin] = React.useState<boolean>(false);

  const login = async (email: string, pass: string) => {
    try {
      const res = await loginByEmail(email, pass);
      if (res.status === 200) {
        if (res.data.status) {
          setTokenLocalStorage(res.data.token);
          setToken(res.data.token);
          setUser(res.data.user);
          setIsLoadingLogin(true);
          router.push("/");
          toast("Đăng nhập thành công");
          return true;
        } else {
          console.log(res.data.message);
          setIsLoadingLogin(false);
          toast.error(res.data.message);
          return false;
        }
      } else {
        console.log(res.status);
        setIsLoadingLogin(false);
        toast.error("Đăng nhập thất bại");
        router.push("/auth/login");
        return false;
      }
    } catch (error) {
      setIsLoadingLogin(false);
      console.log(error);
    }
  };

  const logout = async (email: string) => {
    try {
      const res = await logoutByEmail(email);
      if (res.status === 200) {
        if (res.data.status) {
          localStorage.removeItem("@token");
          setToken("");
          setUser({} as IUser);
          setIsLoadingLogin(false);
          router.push("/auth/login");
          toast("Đăng xuất thành công");
          return true;
        } else {
          console.log(res.data.message);
          setIsLoadingLogin(false);
          return false;
        }
      } else {
        console.log(res.status);
        setIsLoadingLogin(false);
        router.push("/auth/login");
        return false;
      }
    } catch (error) {
      setIsLoadingLogin(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    const autoRedirect = async () => {
      const token = await getToken();
      if (token) {
        setIsLoadingLogin(true);
        setToken(token);
        // router.push("/");
      } else {
        setIsLoadingLogin(false);
        router.push("/auth/login");
      }
    };
    autoRedirect();
  }, []);
  React.useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    const token = await getToken();
    if (token) {
      setIsLoadingLogin(true);
      try {
        const res = await loginByToken(token);
        if (res.status === 200) {
          if (res.data.status) {
            setUser(res.data.user);
            setToken(token);
            return true;
          } else {
            console.log(res.data.message);
            setIsLoadingLogin(false);
            router.push("/auth/login");
            return false;
          }
        } else {
          console.log(res.status);
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
    isLoadingLogin,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const authContext = () => useContext(AuthContext);

export { AuthProvider, authContext };
