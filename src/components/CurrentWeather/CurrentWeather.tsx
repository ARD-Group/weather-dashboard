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
import Typography from "../../web-building-blocks/Atoms/Typography";

interface CurrentWeatherProps {
  data: {
    temp_c: number;
    feels_like_c: number;
    condition: string;
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    uv: number;
    icon: string;
    is_day: number;
    astronomy: {
      sunrise: string;
      sunset: string;
    };
  };
  loading: boolean;
}

const MetricBox: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}> = ({ icon, label, value, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-between h-full ${className}`}
  >
    <div className="w-16 h-16 flex items-center justify-center">{icon}</div>
    <div className="text-center ">
      <Typography variant="title4" className="">
        {value}
      </Typography>
      <Typography variant="subtitle1" className="font-bold">
        {label}
      </Typography>
    </div>
  </div>
);

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, loading }) => {
  const {
    temp_c,
    feels_like_c,
    condition,
    humidity,
    astronomy,
    wind_kph,
    pressure_mb,
    uv,
    icon,
    is_day,
  } = data;
  return (
    <div className="w-full h-full text-center bg-card-bg rounded-panel shadow-panel p-6">
      <div className="flex flex-col lg:flex-row">
        {/* Main Details - Left Section */}
        <div className="lg:w-1/4 md:w-1/2 w-full flex flex-col justify-between mb-6 lg:mb-0 text-center lg:text-left">
          {/* Temperature and Feels Like */}
          <div>
            <Typography
              variant="title2"
              className="bg-gradient-to-r from-base-black dark:from-base-white to-transparent bg-clip-text text-transparent"
            >
              {Math.round(temp_c)}°C
            </Typography>

            <div className=" opacity-80">
              <div className="flex items-center justify-center lg:justify-start">
                <Typography variant="subtitle2">Feels like:</Typography>
                <Typography variant="title3" className="ml-2">
                  {Math.round(feels_like_c)}°C
                </Typography>
              </div>
            </div>
          </div>

          {/* Sun Info */}
          <div className="space-y-4 ">
            {/* Sunrise */}
            <div className="flex items-center justify-center lg:justify-start">
              <WiSunrise className="w-10 h-10 text-text" />
              <div className="ml-3">
                <Typography variant="subtitle2" className="">
                  Sunrise
                </Typography>
                <Typography variant="caption1" className="font-semibold">
                  {astronomy.sunrise}
                </Typography>
              </div>
            </div>

            {/* Sunset */}
            <div className="flex items-center justify-center lg:justify-start">
              <WiSunset className="w-10 h-10 text-text" />
              <div className="ml-3">
                <Typography variant="subtitle2" className="">
                  Sunset
                </Typography>
                <Typography variant="caption1" className="font-semibold">
                  {astronomy.sunset}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Weather Icon & Condition */}
        <div className="flex-1 flex flex-col items-center justify-center relative mb-6 lg:mb-0">
          <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <img
              src={icon.replaceAll("64", "128")}
              alt={condition}
              style={{ width: 290, height: 290 }}
            />
          </div>
          <Typography variant="title3">{condition}</Typography>
        </div>

        {/* Right Section - Weather Metrics */}
        <div className="lg:w-1/4 md:w-full w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 md:gap-4">
            <MetricBox
              icon={<WiHumidity className="w-full h-full text-text" />}
              label="Humidity"
              value={`${humidity}%`}
            />
            <MetricBox
              icon={<WiStrongWind className="w-full h-full text-text" />}
              label="Wind Speed"
              value={`${wind_kph}km/h`}
            />
            <MetricBox
              icon={<WiBarometer className="w-full h-full text-text" />}
              label="Pressure"
              value={`${pressure_mb}hPa`}
            />
            <MetricBox
              icon={<WiHot className="w-full h-full text-text" />}
              label="UV"
              value={uv.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
