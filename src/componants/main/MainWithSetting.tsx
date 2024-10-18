"use client";

import TextWithHighlight from "@/componants/text/TextWithHighlight";
import { TEMP_RANGE, OUTFIT_DATA, WEATHER_DATA } from "@/constants/weather";
import { useGemini } from "@/hooks/useGemini";
import { useHandleStyle } from "@/hooks/useHandleStyle";
import { useHandleWeather } from "@/hooks/useHandleWeather";
import { useEffect, useState } from "react";

const MainWithSetting = () => {
  const [prompt, setPrompt] = useState("");
  const [recommendedOutfit, setRecommendedOutfit] = useState("");
  const [count, setCount] = useState(0);

  const {
    isLoading,
    locationText,
    temp,
    code,
    getBelongings,
    tempDiffer,
    promptGenerator,
  } = useHandleWeather();
  const { gemini } = useGemini(prompt);
  const { select } = useHandleStyle();

  const weather = WEATHER_DATA.filter((data) => data.code === code)[0];
  const tempRange = TEMP_RANGE.filter(
    (data) =>
      data.type ===
      (temp < 10 ? "cold" : temp >= 10 && temp <= 25 ? "comfort" : "hot")
  );
  const belongings = getBelongings();

  useEffect(() => {
    const outfit = OUTFIT_DATA.find((data) => data.style === select)?.data.find(
      (item) => temp >= item.temp[0] && temp < item.temp[1]
    );

    setRecommendedOutfit(outfit?.outfit ?? "");

    const fullPrompt = promptGenerator(
      select,
      weather,
      recommendedOutfit,
      temp
    );
    setPrompt(fullPrompt);
  }, [weather, temp, select]);

  const handleOnclick = () => {
    if (gemini.includes("Please")) {
      alert("새로고침 해주세요!");
    } else {
      setCount((pre) => pre + 1);
      if (count >= 1) {
        alert("추천 의상은 한번만 변경할 수 있어요!");
        return;
      }
      setRecommendedOutfit(gemini.replace("\n", "").trimEnd());
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="w-4/5 h-full grid grid-cols-1 gap-5">
          <TextWithHighlight
            type="weather"
            highlight={weather.main}
            subText={locationText}
            imgSrc={weather.src}
          />
          <TextWithHighlight
            type="temperature"
            highlight={`${temp.toFixed(0)}℃`}
            rightText
            imgSrc={tempRange[0].src}
          />
          <TextWithHighlight
            type="outfit"
            highlight={recommendedOutfit}
            onClick={handleOnclick}
            imgSrc={tempRange[0].outfitSrc}
          />
          {belongings !== undefined && (
            <TextWithHighlight
              type="belongings"
              highlight={belongings?.belonging ?? ""}
              subText={`오늘의 일교차 ${tempDiffer} ℃`}
              imgSrc={belongings?.src ?? ""}
              rightText
            />
          )}
        </div>
      )}
    </>
  );
};

export default MainWithSetting;
