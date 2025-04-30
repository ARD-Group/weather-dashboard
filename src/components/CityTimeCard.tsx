import React from "react";
import Typography from "../web-building-blocks/Atoms/Typography";

interface CityTimeCardProps {
  city: string;
  time: string;
  date: string;
}

const CityTimeCard: React.FC<CityTimeCardProps> = ({ city, time, date }) => {
  return (
    <div className="w-full h-full text-center bg-card-bg rounded-panel shadow-panel">
      <div className="relative">
        {/* City name */}
        <Typography variant="title3" className="">
          {city}
        </Typography>

        {/* Time */}
        <Typography variant="title1" className="">
          {time}
        </Typography>

        {/* Date */}
        <Typography variant="body2" className="">
          {date}
        </Typography>
      </div>
    </div>
  );
};

export default CityTimeCard;
