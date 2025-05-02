import React from "react";
import {
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiDaySunny,
  WiCloudy,
  WiRain,
} from "react-icons/wi";
import Typography from "../../web-building-blocks/Atoms/Typography";
import { getDate } from "../../web-building-blocks/utils/time";

interface ForecastDay {
  date: string;
  max_temp_c: number;
  min_temp_c: number;
  avg_temp_c: number;
  condition: string;
  icon: string;
}

interface ForecastCardProps {
  data: ForecastDay[];
  loading: boolean;
}

const WeatherIcon: React.FC<{
  type: ForecastDay["condition"];
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

const ForecastCard: React.FC<ForecastCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="w-full h-full text-center bg-card-bg  rounded-panel shadow-panel p-4 ">
        <Typography variant="title3" className="  text-center">
          5 Days Forecast
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-center bg-card-bg  rounded-panel shadow-panel p-4 ">
      {/* Title */}
      <Typography variant="title3" className="  text-center">
        5 Days Forecast
      </Typography>

      {/* Forecast Days */}
      <div className="space-y-4">
        {data.map((day, index) => {
          const { avg_temp_c, condition, icon, date } = day;
          return (
            <div key={index} className="flex items-center h-[60px] mx-[30px]">
              {/* Weather Icon */}
                <img src={icon} alt={condition} className="w-[60px] h-[60px]" />

              {/* Temperature */}
              <div className="w-full ">
                <Typography
                  variant="title3"
                  className=" font-semibold text-center"
                >
                  {Math.round(avg_temp_c)}°C
                </Typography>
              </div>

              {/* Date */}
              <div className="w-full ">
                <Typography variant="title4" className=" font-semibold">
                  {getDate(date)}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
