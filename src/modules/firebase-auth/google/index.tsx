import React from "react";
import { toast } from "react-toastify";

import UserItem from "./components/UserItem";
import UiButton from "./components/UiButton";
import SpinerBtn from "./components/SpinerBtn";

import { IUser } from "@/src/models/user";
import { useUser } from "./hooks/useUser";
import { googleProvider, auth, db } from "@/src/modules/firebase-auth/config";

export const GoogleAuth = () => {
  const { user, updateUser, load } = useUser();
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

      await db.collection("users").doc(uid).set({
        displayName,
        email,
        photoURL,
      });

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
        <SpinerBtn />
      ) : user ? (
        <UserItem
          photoURL={user.photoURL}
          email={user.email}
          displayName={user.displayName}
          handleLogout={handleLogout}
        />
      ) : (
        <UiButton handleGoogleLogin={handleGoogleLogin}>Log In</UiButton>
      )}
    </>
  );
};
