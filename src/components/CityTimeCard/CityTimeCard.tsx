import { Typography } from "../../web-building-blocks/Atoms";
import React from "react";

interface CityTimeCardProps {
  city: string;
  time: string;
  date: string;
}

const CityTimeCard: React.FC<CityTimeCardProps> = ({ city, time, date }) => {
  return (
    <div className="w-full h-full text-center bg-card-bg rounded-panel shadow-panel p-12">
      {/* City name */}
      <Typography variant="title3" className="">
        {city}
      </Typography>
      <div className="flex flex-col items-center justify-center -gap-10">
        {/* Time */}
        <Typography variant="title1">{time}</Typography>

        {/* Date */}
        <Typography variant="body2" className="">
          {date}
        </Typography>
      </div>
    </div>
  );
};

export default CityTimeCard;
