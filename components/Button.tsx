import React from "react";

type Props = {
  onClick: () => void;
  bgColor: string;
  className?: string;
  children: React.ReactNode;
};

const Button = ({ onClick, bgColor, className, children }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className={`select-none text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
