"use client";

import LocalStorage from "@/app/utils/storage";
import TextWithHighlight from "@/componants/text/TextWithHighlight";
import {
  TEMP_RANGE,
  OUTFIT_DATA,
  BELONGINGS_DATA,
  WEATHER_DATA,
} from "@/constants/weather";
import { useHandleWeather } from "@/hooks/useHandleWeather";

const MainWithSetting = () => {
  const { isLoading, locationText, tempDiffer, temp, code, isRain } =
    useHandleWeather();

  const weather = WEATHER_DATA.filter((data) => data.code === code)[0];
  const style = JSON.parse(
    LocalStorage.getLocalStorage("style") ?? `{"style":"일상"}`
  ).style;
  const outfit = OUTFIT_DATA.find((data) => data.style === style)?.data.find(
    (item) => temp >= item.temp[0] && temp < item.temp[1]
  );

  const tempRange = TEMP_RANGE.filter(
    (data) =>
      data.type ===
      (temp < 10 ? "cold" : temp >= 10 && temp <= 25 ? "comfort" : "hot")
  );

  const getBelongings = () => {
    if (isRain && tempDiffer > 5) {
      return BELONGINGS_DATA.find((item) => item.type === "both");
    } else if (isRain) {
      return BELONGINGS_DATA.find((item) => item.type === "rain");
    } else if (tempDiffer > 5) {
      return BELONGINGS_DATA.find((item) => item.type === "cold");
    } else {
      return undefined;
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
            highlight={
              outfit !== undefined ? outfit.outfit.replace(", ", ",\n") : ""
            }
            imgSrc={tempRange[0].outfitSrc}
          />
          {(tempDiffer > 0 || isRain) && (
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
