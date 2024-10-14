import { GET } from "@/app/api/location/route";
import { OpenWeatherAPIType } from "@/app/type/weather";
import LocalStorage from "@/app/utils/storage";
import {
  INITIAL_COORDINATE_DATA,
  INITIAL_LOCATION,
} from "@/constants/location";
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
            data.data.list.some((obj: OpenWeatherAPIType) =>
              obj.hasOwnProperty("rain")
            )
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
    tempDiffer,
    code,
    temp,
    isRain,
  };
};
