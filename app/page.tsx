"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/searchBar";
import WeatherDisplay from "../components/WeatherDisplay";
import FavoriteCities from "../components/FavoriteCities";
import { WeatherData } from "@/app/types/weather";
import cookie from "js-cookie";

const MY_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    const storedCities = cookie.get("favoriteCities");
    if (storedCities) {
      setFavoriteCities(JSON.parse(storedCities));
    }
  }, []);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_API_KEY}&units=metric`
      );
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavoriteCity = (city: string) => {
    if (!favoriteCities.includes(city)) {
      const newFavoriteCities = [...favoriteCities, city];
      setFavoriteCities(newFavoriteCities);
      cookie.set("favoriteCities", JSON.stringify(newFavoriteCities));
    }
  };

  const removeFavoriteCity = (city: string) => {
    const newFavoriteCities = favoriteCities.filter((c) => c !== city);
    setFavoriteCities(newFavoriteCities);
    cookie.set("favoriteCities", JSON.stringify(newFavoriteCities));
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl lg:text-5xl mb-4 text-center  font-extrabold text-transparent xl:text-8xl bg-clip-text bg-gradient-to-r from-teal-500 to-orange-200">
        Weather App
      </h1>

      <SearchBar onSearch={fetchWeather} />
      {weather && (
        <div className="mt-4">
          <WeatherDisplay weather={weather} isLoading={isLoading} />
          <div className="flex flex-col items-center justify-center mt-4">
            <button
              onClick={() => addFavoriteCity(weather.name)}
              className="mt-2 px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white rounded flex flex-col items-center"
            >
              Add to Favorites
            </button>
          </div>
        </div>
      )}
      {favoriteCities.length !== 0 && (
        <div className="mt-4">
          <FavoriteCities
            cities={favoriteCities}
            onCitySelect={fetchWeather}
            onRemoveCity={removeFavoriteCity}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
