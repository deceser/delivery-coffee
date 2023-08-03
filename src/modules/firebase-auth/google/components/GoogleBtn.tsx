import React from "react";
import { toast } from "react-toastify";
import { GoogleLogo } from "phosphor-react";

import { IUser } from "@/src/models/user";
import { useUser } from "../hooks/useUser";
import { googleProvider, auth } from "../../config";

const GoogleBtn = () => {
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
        <button
          onClick={handleLogout}
          className="bg-red-500 flex gap-3 items-center text-center w-full py-3 rounded-lg px-4 text-white  text-[20px] hover:brightness-90 transition-all"
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="bg-purple-500 flex gap-3 items-center text-center w-full py-3 rounded-lg px-4 text-white  text-[20px] hover:brightness-90 transition-all"
        >
          {<GoogleLogo size={25} />}
          Google
        </button>
      )}
    </>
  );
};

export { GoogleBtn };
