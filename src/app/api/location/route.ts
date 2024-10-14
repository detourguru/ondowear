import { NextResponse } from "next/server";

async function fetchWeather(lat: string, lon: string, mode: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/${mode}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_APP_KEY}&units=metric`
  );
  const data = await response.json();

  return NextResponse.json({
    message: "ok",
    status: 200,
    data,
  });
}

export { fetchWeather as GET };
