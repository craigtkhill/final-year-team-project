type Props = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#87CEEB] select-none text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
};

export default Button;
