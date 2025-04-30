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
}> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center bg-gray-700/50 rounded-lg p-2 min-w-[80px]">
    <div className="text-white mb-1">{icon}</div>
    <Typography variant="caption1" className="text-gray-400 mb-1">
      {label}
    </Typography>
    <Typography variant="body1-strong" className="text-white">
      {value}
    </Typography>
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
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full max-w-2xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Left section - Temperature and Feels Like */}
        <div className="col-span-3">
          <div className="text-white">
            <Typography variant="title1" className="font-light">
              {temperature}°C
            </Typography>
            <Typography variant="body2" className="text-gray-400 mt-2">
              Feels like: {feelsLike}°C
            </Typography>
          </div>
        </div>

        {/* Middle section - Sun icon and condition */}
        <div className="col-span-3 flex flex-col items-center justify-center">
          <WiDaySunny className="text-yellow-400 text-6xl mb-2" />
          <Typography variant="subtitle2" className="text-white">
            {condition}
          </Typography>
        </div>

        {/* Right section - Sunrise/Sunset */}
        <div className="col-span-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-white">
              <WiSunrise className="text-2xl mr-2" />
              <Typography variant="caption1" className="text-gray-400 mr-2">
                Sunrise
              </Typography>
              <Typography variant="body2" className="text-white">
                {sunrise}
              </Typography>
            </div>
            <div className="flex items-center text-white">
              <WiSunset className="text-2xl mr-2" />
              <Typography variant="caption1" className="text-gray-400 mr-2">
                Sunset
              </Typography>
              <Typography variant="body2" className="text-white">
                {sunset}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - Weather metrics */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <MetricBox
          icon={<WiHumidity size={24} />}
          label="Humidity"
          value={`${humidity}%`}
        />
        <MetricBox
          icon={<WiStrongWind size={24} />}
          label="Wind Speed"
          value={`${windSpeed}km/h`}
        />
        <MetricBox
          icon={<WiBarometer size={24} />}
          label="Pressure"
          value={`${pressure}hPa`}
        />
        <MetricBox
          icon={<WiHot size={24} />}
          label="UV"
          value={uvIndex.toString()}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
