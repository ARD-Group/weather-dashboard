import React, { useEffect, useState } from "react";
import CityTimeCard from "../../components/CityTimeCard";
import { Header } from "../../components";
import CurrentWeather from "../../components/CurrentWeather";
import ForecastCard from "../../components/ForecastCard";
import HourlyForecast from "../../components/HourlyForecast";
import { HourlyForecastResponse, WeatherCurrentResponse } from "../../apis/api/types";
import { weatherCurrent } from "../../apis/api/adapter";

const Dashboard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherCurrentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastResponse[]>([]);

  const handleWeatherCurrent = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!currentLocation) {
        setError("No location selected");
        return;
      }
      const response = await weatherCurrent({ location: currentLocation });
      if (response.data) {
        setWeather(response.data);
        setHourlyForecast(response.data.daily_forecast[0].hourly_forecast);
      } else {
        setError("Failed to fetch weather data");
      }
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleWeatherCurrent();
  }, []);

  useEffect(() => {
    handleWeatherCurrent();
  }, [currentLocation]);

  return (
    <div className="min-h-screen bg-background-gradient ">
      <Header setCurrentLocation={setCurrentLocation} />
      <div className="grid px-4 lg:px-14 xl:px-24 gap-12">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 ">
          <div className="lg:col-span-2">
            {/* City Time Card */}
            <CityTimeCard
              data={
                weather?.location || {
                  name: "",
                  country: "",
                  localtime: "",
                  tz: "",
                }
              }
              loading={loading}
            />
          </div>

          {/* Current Weather */}
          <div className="lg:col-span-3">
            <CurrentWeather
              data={weather?.current || {
                temp_c: 0,
                feels_like_c: 0,
                condition: "",
                humidity: 0,
                wind_kph: 0,
                pressure_mb: 0,
                uv: 0,
                icon: "",
                is_day: 0,
                astronomy: {
                  sunrise: "",
                  sunset: ""
                }
              }}
              loading={loading}
            />
          </div>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 ">
          <div className="lg:col-span-4">
            <ForecastCard
              data={weather?.daily_forecast || []}
              loading={loading}
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
      </div>
    </div>
  );
};

export default Dashboard;
