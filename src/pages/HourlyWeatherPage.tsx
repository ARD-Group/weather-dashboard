import React from "react";
import HourlyForecast from "../components/HourlyForecast";

const HourlyWeatherPage: React.FC = () => {
  const hourlyData = [
    {
      time: "12:00",
      temperature: 26,
      weather: "sunny" as const,
      windSpeed: 3,
      windDirection: "N" as const,
    },
    {
      time: "15:00",
      temperature: 27,
      weather: "sunny" as const,
      windSpeed: 2,
      windDirection: "NE" as const,
    },
    {
      time: "18:00",
      temperature: 27,
      weather: "partly-cloudy" as const,
      windSpeed: 2,
      windDirection: "N" as const,
    },
    {
      time: "21:00",
      temperature: 25,
      weather: "partly-cloudy" as const,
      windSpeed: 3,
      windDirection: "NW" as const,
    },
    {
      time: "00:00",
      temperature: 22,
      weather: "sunny" as const,
      windSpeed: 3,
      windDirection: "N" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <HourlyForecast hours={hourlyData} />
    </div>
  );
};

export default HourlyWeatherPage;
