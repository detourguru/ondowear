export type OpenWeatherAPIType = {
  dt: Date;
  main: OpenWeatherAPIMainType;
  weather: OpenWeatherAPIWeatherType;
  clouds: { all: number };
  wind: OpenWeatherAPIWindType;
  visibility: number;
  pop: number;
  rain: { "3h": number };
  sys: { pod: string };
  dt_txt: string;
};

type OpenWeatherAPIMainType = {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
};

type OpenWeatherAPIWeatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type OpenWeatherAPIWindType = {
  speed: number;
  deg: number;
  gust: number;
};
