import React from "react";
import { toast } from "react-toastify";

import { UserItem } from "./UserItem";

import { IUser } from "@/src/models/user";
import { useUser } from "../hooks/useUser";
import { googleProvider, auth } from "../../config";

const GoogleAuth = () => {
  const { user, updateUser } = useUser();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleGoogleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    try {
      setLoading(true);
      const result = await auth.signInWithPopup(googleProvider);
      const { uid, displayName, email, photoURL } = result.user as IUser;
      const userData: IUser = {
        uid,
        displayName,
        email,
        photoURL,
      };
      updateUser(userData);

      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Error during Google login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    updateUser(null);
    localStorage.removeItem("userData");
  };

  return (
    <>
      {user ? (
        <UserItem
          photoURL={user.photoURL}
          email={user.email}
          displayName={user.displayName}
          handleLogout={handleLogout}
        />
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-[4px] p-[8px] text-white rounded-[6px] select-none bg-purple-500 hover:brightness-90 transition-all"
        >
          Log In
        </button>
      )}
    </>
  );
};

export { GoogleAuth };
