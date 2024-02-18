type Props = {
  onClick: () => void;
  bgColor: string;
  children: React.ReactNode;
};

const Button = ({ onClick, bgColor, children }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className="select-none text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
