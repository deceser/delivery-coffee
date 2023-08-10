import React from "react";

type Props = {
  children: React.ReactNode;
  handleGoogleLogin: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

const UiButton = ({ children, ...props }: Props) => {
  const { handleGoogleLogin } = props;

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center gap-[4px] p-[8px] text-white rounded-[6px] select-none bg-purple-500 hover:brightness-90 transition-all"
    >
      {children}
    </button>
  );
};

export default UiButton;
