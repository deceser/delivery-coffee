import React from "react";
import { IUser } from "@/src/models/user";
import { encryptData, decryptData } from "@/src/helpers/encryption";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

if (!secretKey) {
  throw new Error("NEXT_PUBLIC_SECRET_KEY environment variable is not defined.");
}

export const useUser = () => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [load, setLoad] = React.useState<boolean>(false);

  // Load user data from localStorage on initial render
  React.useEffect(() => {
    setLoad(true);
    const encryptedDataFromLocalStorage = localStorage.getItem("userData");
    if (encryptedDataFromLocalStorage) {
      try {
        const decryptedData = decryptData(encryptedDataFromLocalStorage, secretKey);
        setUser(decryptedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    }
    setLoad(false);
  }, []);

  // Encrypt and save user data to localStorage whenever the user state changes
  React.useEffect(() => {
    if (user) {
      const encryptedData = encryptData(user, secretKey);
      localStorage.setItem("userData", encryptedData);
    } else {
      localStorage.removeItem("userData");
    }
  }, [user]);

  const updateUser = (userData: IUser | null) => {
    setUser(userData);
  };

  return { user, updateUser, load };
};
