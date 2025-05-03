import React, { useState } from "react";
import CityTimeCard from "../../components/CityTimeCard";
import { Header } from "../../components";
import CurrentWeather from "../../components/CurrentWeather";
import ForecastCard from "../../components/ForecastCard";
import HourlyForecast from "../../components/HourlyForecast";
import { useWeatherCurrent } from "../../apis/hooks/useAuth";

const Dashboard: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>("Jordan");
  const [selectedDay, setSelectedDay] = useState<number>(0);
  
  // Use React Query hook with default location
  const { data: weather, loading, error } = useWeatherCurrent(currentLocation);
  
  // Get hourly forecast for selected day
  const hourlyForecast = weather?.daily_forecast?.[selectedDay]?.hourly_forecast || [];
  
  // Default location data
  const locationData = weather?.location || {
    name: "",
    country: "",
    localtime: "",
    tz: "",
  };

  // Default current weather data
  const currentWeatherData = weather?.current || {
    temp_c: 0,
    feels_like_c: 0,
    condition: "",
    humidity: 0,
    wind_kph: 0,
    pressure_mb: 0,
    uv: 0,
    icon: "",
    astronomy: {
      sunrise: "",
      sunset: ""
    }
  };

  // Default forecast data
  const forecastData = weather?.daily_forecast || [];

  const handleDaySelect = (day: any) => {
    const dayIndex = forecastData.findIndex((d: any) => d.date === day.date);
    if (dayIndex !== -1) {
      setSelectedDay(dayIndex);
    }
  };

  return (
    <div className="min-h-screen">
      <Header setCurrentLocation={setCurrentLocation} />
      <div className="grid px-4 lg:px-14 xl:px-24 gap-12">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2">
            {/* City Time Card */}
            <CityTimeCard
              data={locationData}
              loading={loading}
            />
          </div>

          {/* Current Weather */}
          <div className="lg:col-span-3">
            <CurrentWeather
              data={currentWeatherData}
              loading={loading}
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 ">
          <div className="lg:col-span-4">
            <ForecastCard
              data={forecastData}
              loading={loading}
              onDaySelect={handleDaySelect}
            />
          </div>

          {/* Hourly Forecast */}
          <div className="lg:col-span-8">
            <HourlyForecast
              data={hourlyForecast}
              loading={loading}
            />
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;