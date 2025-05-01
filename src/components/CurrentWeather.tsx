import React from "react";
import {
  WiDaySunny,
  WiSunrise,
  WiSunset,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiHot,
} from "react-icons/wi";
import Typography from "../web-building-blocks/Atoms/Typography";

interface CurrentWeatherProps {
  temperature: number;
  feelsLike: number;
  condition: string;
  sunrise: string;
  sunset: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
}

const MetricBox: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}> = ({ icon, label, value, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-between h-[138.95px] ${className}`}
  >
    <div className="w-[60px] h-[58px] flex items-center justify-center ">
      {icon}
    </div>
    <div className="text-center">
      <Typography variant="body1-strong" className="">
        {value}
      </Typography>
      <Typography variant="caption1" className=" mt-1 font-medium">
        {label}
      </Typography>
    </div>
  </div>
);

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  feelsLike,
  condition,
  sunrise,
  sunset,
  humidity,
  windSpeed,
  pressure,
  uvIndex,
}) => {
  return (
    <div className="w-full h-full text-center bg-card-bg  rounded-panel shadow-panel p-4 flex">
      {/* Main Details - Left Section */}
      <div className="w-[204px] flex flex-col justify-between">
        {/* Temperature and Feels Like */}
        <div>
          <Typography
            variant="title2"
            className="bg-gradient-to-r  from-base-black dark:from-base-white to-transparent  bg-clip-text text-transparent"
          >
            {temperature}°C
          </Typography>

          <div className="mt-4 opacity-80">
            <div className="flex items-center">
              <Typography variant="subtitle2">Feels like:</Typography>
              <Typography variant="subtitle1" className="ml-2">
                {feelsLike}°C
              </Typography>
            </div>
          </div>
        </div>

        {/* Sun Info */}
        <div className="space-y-4">
          {/* Sunrise */}
          <div className="flex items-center">
            <WiSunrise className="w-12 h-12 text-text" />
            <div className="ml-3">
              <Typography variant="subtitle2" className="">
                Sunrise
              </Typography>
              <Typography variant="caption1" className=" font-semibold">
                {sunrise}
              </Typography>
            </div>
          </div>

          {/* Sunset */}
          <div className="flex items-center">
            <WiSunset className="w-12 h-12 text-text" />
            <div className="ml-3">
              <Typography variant="subtitle2" className="">
                Sunset
              </Typography>
              <Typography variant="caption1" className=" font-semibold">
                {sunset}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section - Weather Icon & Condition */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <WiDaySunny className="w-[270px] h-[270px] text-text" />
        <Typography variant="subtitle1" className=" font-semibold mt-4">
          {condition}
        </Typography>
      </div>

      {/* Right Section - Weather Metrics */}
      <div className="w-[247px]">
        <div className="grid grid-cols-2 gap-4">
          <MetricBox
            icon={<WiHumidity className="w-full h-full text-text" />}
            label="Humidity"
            value={`${humidity}%`}
          />
          <MetricBox
            icon={<WiStrongWind className="w-full h-full text-text" />}
            label="Wind Speed"
            value={`${windSpeed}km/h`}
          />
          <MetricBox
            icon={<WiBarometer className="w-full h-full text-text" />}
            label="Pressure"
            value={`${pressure}hPa`}
          />
          <MetricBox
            icon={<WiHot className="w-full h-full text-text" />}
            label="UV"
            value={uvIndex.toString()}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
