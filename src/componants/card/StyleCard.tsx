import Image from "next/image";

interface StyleCardProps {
  style: string;
  imagePath: string;
}

const StyleCard = ({ style, imagePath }: StyleCardProps) => {
  return (
    <button className="relative w-[130px] h-[130px] rounded-xl border">
      <Image width={130} height={130} alt={style} src={imagePath} />
      <span className="absolute bottom-0 inset-x-0 p-2 text-bold-12">
        {style}
      </span>
    </button>
  );
};

export default StyleCard;
