import React from "react";
import { WiDaySunny, WiDayCloudy } from "react-icons/wi";
import Typography from "../../web-building-blocks/Atoms/Typography";
import { getTime } from "../../web-building-blocks";

interface HourlyData {
  time: string;
  temp_c: number;
  condition: string;
  wind_kph: number;
  icon: string;
  is_day: number;
  wind_dir:
    | "N"
    | "NNE"
    | "NE"
    | "ENE"
    | "E"
    | "ESE"
    | "SE"
    | "SSE"
    | "S"
    | "SSW"
    | "SW"
    | "WSW"
    | "W"
    | "WNW"
    | "NW"
    | "NNW";
}

interface HourlyForecastProps {
  data: HourlyData[];
  loading: boolean;
}

const WeatherIcon: React.FC<{ type: HourlyData["condition"] }> = ({ type }) => {
  const iconProps = {
    className: "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-text",
  };

  switch (type) {
    case "sunny":
      return <WiDaySunny {...iconProps} />;
    case "partly-cloudy":
      return <WiDayCloudy {...iconProps} />;
    default:
      return null;
  }
};

const WindArrow: React.FC<{ direction: HourlyData["wind_dir"] }> = ({
  direction,
}) => {
  const getRotation = () => {
    const directions = {
      N: 0,
      NNE: 22.5,
      NE: 45,
      ENE: 67.5,
      E: 90,
      ESE: 112.5,
      SE: 135,
      SSE: 157.5,
      S: 180,
      SSW: 202.5,
      SW: 225,
      WSW: 247.5,
      W: 270,
      WNW: 292.5,
      NW: 315,
      NNW: 337.5,
    };

    return directions[direction];
  };

  return (
    <div
      className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center"
      style={{ transform: `rotate(${getRotation()}deg)` }}
    >
      <div className=" text-2xl md:text-3xl lg:text-4xl text-text">▲</div>
    </div>
  );
};

const HourCard: React.FC<HourlyData> = (data) => {
  const { time, temp_c, condition, wind_kph, icon, is_day, wind_dir } = data;
  return (

    <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-full bg-secondary-light dark:bg-secondary-dark rounded-card flex flex-col items-center flex-shrink-0">
      {/* Hour */}
      <Typography variant="subtitle1" className=" font-bold mt-2 md:mt-3">
        {getTime(time)}
      </Typography>

      {/* Weather Icon */}
      <div className="mt-2 md:mt-4 lg:mt-6">
        <img src={icon} alt={condition} />
      </div>

      {/* Temperature */}
      <Typography variant="subtitle2" className=" font-bold mt-1">
        {temp_c}°C
      </Typography>

      {/* Wind Direction */}
      <div className="mt-1 md:mt-2">
        <WindArrow direction={wind_dir} />
      </div>

      {/* Wind Speed */}
      <Typography variant="subtitle2" className=" font-bold mt-1 md:mt-2 mb-2">
        {wind_kph}km/h
      </Typography>
    </div>
  );
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full text-center bg-card-bg rounded-panel shadow-panel p-2 md:p-4">
      <div className="flex flex-col h-full">
        {/* Title */}
        <div className="flex justify-center mb-4 md:mb-6 lg:mb-12">
          <Typography variant="title3" className=" font-bold">
            Hourly Forecast
          </Typography>
        </div>

        {/* Hour Cards */}
        <div className="flex justify-evenly  pb-4 gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 items-center overflow-x-hidden">
          {data.map((hour, index) => (
            <HourCard key={index} {...hour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
