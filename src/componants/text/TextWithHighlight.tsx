import { WEATHER_MEDIA_TEXT } from "@/constants/weather";
import Image from "next/image";

interface TextWithHighlightProps {
  type: string;
  highlight: string;
  subText?: string;
  imgSrc: string;
  rightText?: boolean;
}

const TextWithHighlight = ({
  type,
  highlight,
  subText,
  imgSrc,
  rightText,
}: TextWithHighlightProps) => {
  const media = WEATHER_MEDIA_TEXT.filter((media) => media.type === type)[0];
  return (
    <div className="flex w-full justify-between">
      <div
        className={`w-2/3 ${
          rightText ? "order-2 text-right" : "order-1 text-left"
        }`}
      >
        {subText !== undefined && (
          <>
            <span className="text-regular-12 text-gray-400">{subText}</span>
            <br />
          </>
        )}
        <span className="text-bold-34 whitespace-pre-wrap">
          {media.text[0]}
          <br />
          <span className="text-blue-500">{highlight}</span>
          {media.text[1]}
        </span>
      </div>
      <div className={`${rightText ? "order-1" : "order-2"} content-center`}>
        <Image src={imgSrc} alt={imgSrc} width={100} height={100} />
      </div>
    </div>
  );
};

export default TextWithHighlight;
