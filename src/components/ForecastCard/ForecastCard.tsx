import React, { useState } from "react";
import Typography from "../../web-building-blocks/Atoms/Typography";
import { getDate } from "../../web-building-blocks/utils/time";
import { Skeleton } from "../../web-building-blocks/Atoms";

interface ForecastDay {
  date: string;
  max_temp_c: number;
  min_temp_c: number;
  avg_temp_c: number;
  condition: string;
  icon: string;
  hourly_forecast?: any[];
}

interface ForecastCardProps {
  data: ForecastDay[];
  loading: boolean;
  onDaySelect?: (day: ForecastDay) => void;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  data,
  loading,
  onDaySelect,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(0);

  if (loading) {
    return (
      <Skeleton
        styleClasses={{
          skeleton: "w-auto h-[366px] p-12 rounded-panel shadow-panel",
        }}
      />
    );
  }

  const handleDayClick = (day: ForecastDay, index: number) => {
    setSelectedDay(index);
    if (onDaySelect) {
      onDaySelect(day);
    }
  };

  return (
    <div className="w-auto h-[366px] text-center bg-card-bg rounded-panel shadow-panel p-4">
      {/* Title */}
      <Typography variant="title5" className="text-center">
        5 Days Forecast:
      </Typography>

      {/* Forecast Days */}
      <div className="pl-3">
        {data.map((day, index) => {
          const { avg_temp_c, condition, icon, date } = day;
          return (
            <div
              key={index}
              className={`flex items-center h-[60px] cursor-pointer transition-transform duration-200 hover:scale-[1.03] ${
                selectedDay === index
                  ? "bg-hourly-card-bg rounded-xl"
                  : ""
              }`}
              onClick={() => handleDayClick(day, index)}
            >
              {/* Weather Icon */}
              <img src={icon} alt={condition} className="w-[60px] h-[60px]" />

              {/* Temperature */}
              <div className="w-full">
                <Typography variant="subtitle2-strong">
                  {Math.round(avg_temp_c)}°C
                </Typography>
              </div>

              {/* Date */}
              <div className="w-full">
                <Typography variant="subtitle2">{getDate(date)}</Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
