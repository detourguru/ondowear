interface fetchLocationRequest {
  lat: string;
  lon: string;
  mode: string;
}

export const fetchWeather = async ({
  lat,
  lon,
  mode,
}: fetchLocationRequest) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/${mode}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_APP_KEY}&units=metric`
  );
  return await response.json();
};
