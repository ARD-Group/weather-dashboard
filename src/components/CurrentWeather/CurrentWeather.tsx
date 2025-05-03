import React from "react";
import Typography from "../../web-building-blocks/Atoms/Typography";
import Icon from "../../utils/Icon";
import { Skeleton } from "../../web-building-blocks/Atoms";

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
    astronomy: {
      sunrise: string;
      sunset: string;
    };
  };
  loading: boolean;
}

const MetricBox: React.FC<{
  icon: "humidity" | "wind" | "pressure" | "uv";
  label: string;
  value: string;
  className?: string;
}> = ({ icon, label, value, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-between h-full ${className}`}
  >
    <div className="w-16 h-16 flex items-center justify-center">
      <Icon name={icon} size={50} color="#fbbf24" />
    </div>
    <div className="text-center gap-2">
      <Typography variant="title4" className="my-1">
        {value}
      </Typography>
      <Typography variant="subtitle1">{label}</Typography>
    </div>
  </div>
);

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Skeleton
        styleClasses={{
          skeleton: "w-auto min-h-[330px] p-12 rounded-panel shadow-panel",
        }}
      />
    );
  }
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
  } = data;
  return (
    <div className="w-auto md:h-[330px] min-h-[330px] text-center bg-card-bg rounded-panel shadow-panel p-6">
      <div className="flex flex-col lg:flex-row">
        {/* Main Details - Left Section */}
        <div className="lg:w-1/4 md:w-1/2 w-full flex flex-col justify-between mb-6 lg:mb-0 text-center lg:text-left">
          {/* Temperature and Feels Like */}
          <div>
            <Typography
              variant="title2"
              className="bg-gradient-to-r from-base-black dark:from-base-white to-transparent bg-clip-text text-transparent -my-5"
            >
              {Math.round(temp_c)}°C
            </Typography>

            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Typography variant="subtitle2">Feels like:</Typography>
              <Typography variant="title3" className="">
                {Math.round(feels_like_c)}°C
              </Typography>
            </div>
          </div>

          {/* Sun Info */}
          <div className="space-y-4 px-5">
            {/* Sunrise */}
            <div className="flex items-center justify-center lg:justify-start">
              <Icon name="sunrise" size={50} color="#fbbf24" />
              <div className="ml-3">
                <Typography variant="subtitle2" className="">
                  Sunrise
                </Typography>
                <Typography variant="caption1">{astronomy.sunrise}</Typography>
              </div>
            </div>

            {/* Sunset */}
            <div className="flex items-center justify-center lg:justify-start">
              <Icon name="sunset" size={50} color="#fbbf24" />
              <div className="ml-3">
                <Typography variant="subtitle2" className="">
                  Sunset
                </Typography>
                <Typography variant="caption1">{astronomy.sunset}</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Weather Icon & Condition */}
        <div className="flex-1 flex flex-col items-center justify-center relative mb-6 lg:mb-0">
          <img
            src={icon.replaceAll("64", "128")}
            alt={condition}
            style={{ width: 200, height: 200 }}
            className="scale-150"
          />
          <Typography variant="title3" className="mt-5">
            {condition}
          </Typography>
        </div>

        {/* Right Section - Weather Metrics */}
        <div className="lg:w-1/4 md:w-full w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 md:gap-4">
            <MetricBox
              icon="humidity"
              label="Humidity"
              value={`${Math.round(humidity)}%`}
            />
            <MetricBox
              icon="wind"
              label="Wind Speed"
              value={`${Math.round(wind_kph)}km/h`}
            />
            <MetricBox
              icon="pressure"
              label="Pressure"
              value={`${Math.round(pressure_mb)}hPa`}
            />
            <MetricBox icon="uv" label="UV" value={uv.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
