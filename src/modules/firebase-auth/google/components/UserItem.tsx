import React from "react";
import { Dropdawn } from "./Dropdawn";

type Props = {
  displayName?: string;
  email?: string;
  photoURL?: string;
  handleLogout: () => void;
};

const UserItem = ({ ...props }: Props) => {
  const { photoURL, displayName, email, handleLogout } = props;
  return (
    <div className="releative flex">
      <img
        src={photoURL}
        alt="avatar"
        className="rounded-[50px] w-[45px] h-[45px] bg-purple-500 flex justify-center items-center cursor-pointer"
      />

      <Dropdawn />
    </div>
  );
};

export { UserItem };
