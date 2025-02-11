import axios from "axios";
import React, { useState, Children, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../components/models";

export type AuthenticationContextType = {
  isLoggedIn: boolean;
  user?: User | null;
  login: (user: User | null) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

export const AuthenticationContext =
  React.createContext<AuthenticationContextType>({
    isLoggedIn: false,
    user: null,
    // Promise.resolve kullanarak düzeltildi
    login: (_: User | null) => Promise.resolve(false),
    logout: () => Promise.resolve(false),
  });

interface AuthProviderProps {
  user: User | null; // user prop'u null olabilir
  children: React.ReactNode;
}

export const AuthenticationProvider: React.FC<AuthProviderProps> = (props) => {
  const [user, setUser] = useState<User | null>(props.user);

  const login = async (user: User | null) => {
    if (user) {
      setUser(user);
    }
    return Promise.resolve(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["AccessToken", "User"]);
    delete axios.defaults.headers["Authorization"]; // null yerine delete kullanıldı
    setUser(null);
    return Promise.resolve(true);
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <AuthenticationContext.Provider
      value={{ login, logout, user, isLoggedIn: !!user }}
    >
      {Children.only(props.children)}
    </AuthenticationContext.Provider>
  );
};
