interface fetchLocationRequest {
  lat: string;
  lon: string;
}

export const fetchLocation = async ({ lat, lon }: fetchLocationRequest) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_APP_KEY}`
  );
  return await response.json();
};
