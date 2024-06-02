"use client";

import React from "react";
import { WeatherData } from "@/app/types/weather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Spinner from "./spinner";

interface WeatherDisplayProps {
  weather: WeatherData | null;
  isLoading: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-tr from-violet-400 to-orange-300 mx-auto font-bold  w-8/12">
        <Spinner />
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-64">
        No weather data available.
      </div>
    );
  }

  const cityName = weather.name;

  return (
    <Card className="flex flex-col w-8/12 items-center justify-center h-64 bg-gradient-to-r from-teal-400 to-orange-400 text-center  mx-auto font-bold">
      <CardHeader>
        <CardTitle>{cityName && `Weather in ${cityName}`}</CardTitle>
        <CardDescription>
          {weather.weather && weather.weather.length > 0
            ? weather.weather[0].description
            : "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {weather.main ? (
          <>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity} %</p>
          </>
        ) : (
          <p>Main weather data not available</p>
        )}
        {weather.wind ? (
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        ) : (
          <p>Wind data not available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
