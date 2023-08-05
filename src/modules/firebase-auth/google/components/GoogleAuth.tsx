import React from "react";
import { toast } from "react-toastify";

import { UserItem } from "./UserItem";

import { IUser } from "@/src/models/user";
import { useUser } from "../hooks/useUser";
import { googleProvider, auth } from "../../config";

const GoogleAuth = () => {
  const { user, updateUser, load } = useUser();
  const [loading, setLoading] = React.useState<boolean>(false);

  console.log(load);

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
    }
    setLoading(false);
  };

  const handleLogout = () => {
    auth.signOut();
    updateUser(null);
    localStorage.removeItem("userData");
  };

  return (
    <>
      {load || loading ? (
        <button
          className="flex items-center gap-[4px] p-[8px] text-white rounded-[6px] select-none bg-purple-500"
          disabled
        >
          <svg
            className="animate-spin h-5 w-5 "
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            viewBox="0 0 256 256"
          >
            <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
          </svg>
        </button>
      ) : user ? (
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
