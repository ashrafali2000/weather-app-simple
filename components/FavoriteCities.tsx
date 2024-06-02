"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FavoriteCitiesProps {
  cities: string[];
  onCitySelect: (city: string) => void;
  onRemoveCity: (city: string) => void;
}

const FavoriteCities: React.FC<FavoriteCitiesProps> = ({
  cities,
  onCitySelect,
  onRemoveCity,
}) => {
  return (
    <Card className="bg-gradient-to-r from-orange-400 to-teal-400 w-full lg:w-8/12 flex flex-col items-center justify-center h-64 text-center shadow-md mx-auto  font-bold">
      <CardHeader>
        <CardTitle>Favorite Cities</CardTitle>
        <CardDescription>Click on a city to see the weather</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {cities.map((city) => (
            <li key={city} className="flex justify-between items-center mb-2">
              <Button variant="link" onClick={() => onCitySelect(city)}>
                {city}
              </Button>
              <Button variant="destructive" onClick={() => onRemoveCity(city)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FavoriteCities;
