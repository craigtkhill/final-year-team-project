type Props = {
  text: string;
  onClick: () => void;
  bgColor?: string;
};

const Button = ({ text, onClick, bgColor }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[${bgColor}] select-none text-white font-bold py-2 px-4 rounded`}
    >
      {text}
    </button>
  );
};

export default Button;
