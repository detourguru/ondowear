import { GET } from "@/app/api/location/route";
import { OpenWeatherAPIType } from "@/app/type/weather";
import LocalStorage from "@/app/utils/storage";
import {
  INITIAL_COORDINATE_DATA,
  INITIAL_LOCATION,
} from "@/constants/location";
import { BELONGINGS_DATA } from "@/constants/weather";
import { useEffect, useState } from "react";

export const useHandleWeather = () => {
  const location = JSON.parse(
    LocalStorage.getLocalStorage("location") ??
      `{"location": ${INITIAL_LOCATION}, "lat": ${INITIAL_COORDINATE_DATA.lat}}, "lng": ${INITIAL_COORDINATE_DATA.lng}}`
  );
  const [code, setCode] = useState(0);
  const [tempMinMax, setTempMinMax] = useState({
    temp_max: 0,
    temp_min: 0,
  });
  const [temp, setTemp] = useState(0);
  const [isRain, setIsRain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const locationText = `${location.location.split(" ")[0]}, ${
    location.location.split(" ")[1]
  }`;

  const tempDiffer = parseInt(
    (tempMinMax.temp_max - tempMinMax.temp_min).toFixed(0)
  );

  const getBelongings = () => {
    if (isRain && tempDiffer >= 5) {
      return BELONGINGS_DATA.find((item) => item.type === "both");
    } else if (isRain) {
      return BELONGINGS_DATA.find((item) => item.type === "rain");
    } else if (tempDiffer >= 5) {
      return BELONGINGS_DATA.find((item) => item.type === "cold");
    } else {
      return undefined;
    }
  };

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

  useEffect(() => {
    // daily
    const getDailyData = () => {
      GET(location.lat, location.lng, "forecast").then((data) => {
        data.json().then((data) => {
          const targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + 1);

          const result = data.data.list.filter(
            (item: OpenWeatherAPIType) =>
              new Date(item.dt_txt) <=
              new Date(targetDate.toISOString().split("T")[0] + " 00:00:00")
          );

          setIsRain(
            result.some((obj: OpenWeatherAPIType) => obj.hasOwnProperty("rain"))
          );

          const { maxTemp, minTemp } = result.reduce(
            (
              acc: { maxTemp: number; minTemp: number },
              item: OpenWeatherAPIType
            ) => {
              const { temp_max, temp_min } = item.main;
              return {
                maxTemp: Math.max(acc.maxTemp, temp_max),
                minTemp: Math.min(acc.minTemp, temp_min),
              };
            },
            { maxTemp: -Infinity, minTemp: Infinity }
          );

          setTempMinMax({
            temp_max: maxTemp,
            temp_min: minTemp,
          });
        });
      });
    };

    // current
    const getCurrentData = () => {
      GET(location.lat, location.lng, "weather").then((data) => {
        data.json().then((data) => {
          setTemp(data.data.main.temp);
          setCode(data.data.weather[0].id);
          setIsLoading(false);
        });
      });
    };

    getDailyData();
    getCurrentData();
  }, []);

  return {
    isLoading,
    locationText,
    code,
    temp,
    getBelongings,
    tempDiffer,
    promptGenerator,
  };
};
