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

  const [isDropDownVisible, setIsDropDownVisible] = React.useState(false);
  const outerDivRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setIsDropDownVisible((prevState) => !prevState);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (outerDivRef.current && !outerDivRef.current.contains(event.target as Node)) {
      setIsDropDownVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="releative flex" ref={outerDivRef}>
      <img
        src={photoURL}
        alt="avatar"
        className="rounded-[50px] w-[45px] h-[45px] bg-purple-500 flex justify-center items-center cursor-pointer"
        onClick={toggleDropDown}
      />
      {isDropDownVisible && (
        <div
          ref={dropdownRef}
          className="absolute w-200px h-auto right-80 top-20 max-sm:right-12 max-md:right-24 max-lg:right-20 max-xl:right-24 max-2xl:right-44"
        >
          <Dropdawn displayName={displayName} email={email} handleLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default UserItem;
