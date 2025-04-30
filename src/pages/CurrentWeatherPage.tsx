import React from "react";
import CurrentWeather from "../components/CurrentWeather";

const CurrentWeatherPage: React.FC = () => {
  const currentWeatherData = {
    temperature: 24,
    feelsLike: 22,
    condition: "Sunny",
    sunrise: "06:37 AM",
    sunset: "20:37 AM",
    humidity: 41,
    windSpeed: 2,
    pressure: 997,
    uvIndex: 8,
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <CurrentWeather {...currentWeatherData} />
    </div>
  );
};

export default CurrentWeatherPage;
