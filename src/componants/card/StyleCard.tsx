import Image from "next/image";

interface StyleCardProps {
  style: string;
  imagePath: string;
  isSelected: boolean;
  onClick: () => void;
}

const StyleCard = ({
  style,
  imagePath,
  isSelected,
  onClick,
}: StyleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-[130px] h-[130px] rounded-xl border ${
        isSelected ? "border-blue-500" : ""
      }`}
    >
      <Image width={130} height={130} alt={style} src={imagePath} />
      <span className="absolute bottom-0 inset-x-0 p-2 text-bold-12">
        {style}
      </span>
    </button>
  );
};

export default StyleCard;
