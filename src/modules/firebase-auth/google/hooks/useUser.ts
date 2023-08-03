import React from "react";
import { IUser } from "@/src/models/user";

export const useUser = () => {
  const [user, setUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      const userData = JSON.parse(userDataFromLocalStorage);
      setUser(userData);
    }
  }, []);

  const updateUser = (userData: IUser | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  };

  return { user, updateUser };
};
