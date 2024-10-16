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

  const { isLoading, locationText, temp, code, getBelongings, tempDiffer } =
    useHandleWeather();
  const { gemini } = useGemini(prompt);
  const { select } = useHandleStyle();

  const weather = WEATHER_DATA.filter((data) => data.code === code)[0];
  const tempRange = TEMP_RANGE.filter(
    (data) =>
      data.type ===
      (temp < 10 ? "cold" : temp >= 10 && temp <= 25 ? "comfort" : "hot")
  );

  useEffect(() => {
    const outfit = OUTFIT_DATA.find((data) => data.style === select)?.data.find(
      (item) => temp >= item.temp[0] && temp < item.temp[1]
    );

    if (recommendedOutfit === "") {
      setRecommendedOutfit(outfit?.outfit ?? "");
    }

    const promptGenerator = (
      select: string,
      weather: { main?: string },
      recommendedOutfit: string,
      temp: number
    ) => {
      return `
      당신은 특별한 사용자가 사용하기 위해 고안된, 주어진 조건에 맞추어 두 가지 의상만을 대답할 수 있는 기계입니다. 
      당신은 두 가지 단어 이외의 답변은 내놓을 수 없습니다.
      각각의 단어는 한 종류의 의상이어야 하며 주어진 온도 및 날씨 조건에 따라 "가벼운, 따뜻한, 긴, 짧은" 등의 온도에 기반하는 적절한 접두어가 붙을 수도 있습니다.
      답변은 두 개의 단어(의상), 한 개의 쉼표로 이루어져있으며 다른 부호는 필요하지 않습니다.

      이 기계의 사용자는 날씨에 아주 민감하여 기온과 날씨에 적절하지 않은 옷을 입으면 길을 가다가 혼절할 가능성이 있습니다.
      따라서 조건에 따른 매우 정확한 의상을 추천해주어야 합니다.
      사용자에겐 정해진 성별이 없기 때문에 드레스, 치마와 같은 성별을 특정하는 옷은 추천하지 않는 것이 좋습니다.

      **조건:** 사용자는 ${select} 상황에서 입을 옷을 추천받고 있습니다. 오늘의 날씨는 ${weather?.main}이고, 온도는 섭씨 ${temp}도 입니다.
      주어진 의상 ${recommendedOutfit}가 맘에 들지 않아서 당신에게 의상을 추천받는 것으로, ${recommendedOutfit}와 겹치는 의상은 추천해주지 마세요.

      이 조건에 맞춰 가장 적합한 두 가지 의상을 추천해주세요.

      **가장 적합한 답변의 예시:** "${recommendedOutfit}"
      `;
    };
    const fullPrompt = promptGenerator(
      select,
      weather,
      recommendedOutfit,
      temp
    );
    setPrompt(fullPrompt);
  }, [weather, temp, recommendedOutfit, select]);

  const handleOnclick = () => {
    if (gemini.includes("Please")) {
      alert("새로고침 해주세요!");
    } else {
      if (count > 3) {
        alert("더 추천할 의상이 없어요!");
        return;
      }
      setRecommendedOutfit(gemini.replace("\n", "").trimEnd());
      setCount((pre) => pre + 1);
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
          {getBelongings() !== undefined && (
            <TextWithHighlight
              type="belongings"
              highlight={getBelongings()?.belonging ?? ""}
              subText={`오늘의 일교차 ${tempDiffer} ℃`}
              imgSrc={getBelongings()?.src ?? ""}
              rightText
            />
          )}
        </div>
      )}
    </>
  );
};

export default MainWithSetting;
