import { WEATHER_MEDIA_TEXT } from "@/constants/weather";

interface TextWithHighlightProps {
  type: string;
  highlight: string;
}

const TextWithHighlight = ({ type, highlight }: TextWithHighlightProps) => {
  return (
    <div>
      <span className="text-bold-34">
        <br />
        <span className="text-blue-500">{}</span>
      </span>
    </div>
  );
};

export default TextWithHighlight;
