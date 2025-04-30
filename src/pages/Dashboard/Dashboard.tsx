import React from "react";
import CityTimeCard from "../../components/CityTimeCard";
import ForecastCard from "../../components/ForecastCard";
import HourlyForecast from "../../components/HourlyForecast";
import CurrentWeather from "../../components/CurrentWeather";
import { Header } from "../../components/Header";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-gradient ">
      <Header />
      <div className="container mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* City Time Card */}
          <CityTimeCard city="Athens" time="09:03" date="Thursday, 31 Aug" />

          {/* Current Weather */}

          <CurrentWeather
            temperature={24}
            feelsLike={22}
            condition="Sunny"
            sunrise="06:37 AM"
            sunset="20:37 AM"
            humidity={41}
            windSpeed={2}
            pressure={997}
            uvIndex={8}
          />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 5 Days Forecast */}
          <div className="lg:col-span-2">
            <ForecastCard
              days={[
                {
                  date: "Friday, 1 Sep",
                  temperature: 20,
                  weather: "partly-cloudy",
                },
                {
                  date: "Saturday, 2 Sep",
                  temperature: 22,
                  weather: "partly-cloudy",
                },
                {
                  date: "Sunday, 3 Sep",
                  temperature: 27,
                  weather: "sunny",
                },
                {
                  date: "Monday, 4 Sep",
                  temperature: 18,
                  weather: "cloudy",
                },
                {
                  date: "Tuesday, 5 Sep",
                  temperature: 16,
                  weather: "rainy",
                },
              ]}
            />
          </div>

          {/* Hourly Forecast */}
          <div>
            <HourlyForecast
              hours={[
                {
                  time: "12:00",
                  temperature: 26,
                  weather: "sunny",
                  windSpeed: 3,
                  windDirection: "N",
                },
                {
                  time: "15:00",
                  temperature: 27,
                  weather: "sunny",
                  windSpeed: 2,
                  windDirection: "NE",
                },
                {
                  time: "18:00",
                  temperature: 27,
                  weather: "partly-cloudy",
                  windSpeed: 2,
                  windDirection: "N",
                },
                {
                  time: "21:00",
                  temperature: 25,
                  weather: "partly-cloudy",
                  windSpeed: 3,
                  windDirection: "NW",
                },
                {
                  time: "00:00",
                  temperature: 22,
                  weather: "sunny",
                  windSpeed: 3,
                  windDirection: "N",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
