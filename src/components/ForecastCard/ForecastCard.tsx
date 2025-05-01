import React from "react";
import {
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiDaySunny,
  WiCloudy,
  WiRain,
} from "react-icons/wi";
import Typography from "../../web-building-blocks/Atoms/Typography";

interface ForecastDay {
  date: string;
  temperature: number;
  weather: "partly-cloudy" | "mostly-cloudy" | "sunny" | "cloudy" | "rainy";
}

interface ForecastCardProps {
  days: ForecastDay[];
}

const WeatherIcon: React.FC<{
  type: ForecastDay["weather"];
  className?: string;
}> = ({ type, className }) => {
  const iconProps = { className: `w-[60px] h-[60px] ${className}` };

  switch (type) {
    case "partly-cloudy":
      return <WiDaySunnyOvercast {...iconProps} />;
    case "mostly-cloudy":
      return <WiDayCloudy {...iconProps} />;
    case "sunny":
      return <WiDaySunny {...iconProps} />;
    case "cloudy":
      return <WiCloudy {...iconProps} />;
    case "rainy":
      return <WiRain {...iconProps} />;
    default:
      return null;
  }
};

const ForecastCard: React.FC<ForecastCardProps> = ({ days }) => {
  return (
    <div className="w-full h-full text-center bg-card-bg  rounded-panel shadow-panel p-4 ">
      {/* Title */}
      <Typography variant="title3" className="  text-center">
        5 Days Forecast
      </Typography>

      {/* Forecast Days */}
      <div className="space-y-4">
        {days.map((day, index) => (
          <div key={index} className="flex items-center h-[60px] mx-[30px]">
            {/* Weather Icon */}
            <div className="hidden xl:block w-[60px]">
              <WeatherIcon type={day.weather} className="text-text" />
            </div>

            {/* Temperature */}
            <div className="w-full ">
              <Typography
                variant="title3"
                className=" font-semibold text-center"
              >
                {day.temperature}°C
              </Typography>
            </div>

            {/* Date */}
            <div className="w-full ">
              <Typography variant="title4" className=" font-semibold">
                {day.date}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
