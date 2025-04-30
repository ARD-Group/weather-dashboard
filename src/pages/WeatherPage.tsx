import React from "react";
import ForecastCard from "../components/ForecastCard";

const WeatherPage: React.FC = () => {
  const forecastData = [
    {
      date: "Friday, 1 Sep",
      temperature: 20,
      weather: "partly-cloudy" as const,
    },
    {
      date: "Saturday, 2 Sep",
      temperature: 22,
      weather: "mostly-cloudy" as const,
    },
    {
      date: "Sunday, 3 Sep",
      temperature: 27,
      weather: "sunny" as const,
    },
    {
      date: "Monday, 4 Sep",
      temperature: 18,
      weather: "cloudy" as const,
    },
    {
      date: "Tuesday, 5 Sep",
      temperature: 16,
      weather: "rainy" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <ForecastCard days={forecastData} />
    </div>
  );
};

export default WeatherPage;
