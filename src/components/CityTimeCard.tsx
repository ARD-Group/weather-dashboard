import React from "react";
import Typography from "../web-building-blocks/Atoms/Typography";

interface CityTimeCardProps {
  city: string;
  time: string;
  date: string;
}

const CityTimeCard: React.FC<CityTimeCardProps> = ({ city, time, date }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-[300px]">
      <div className="space-y-4">
        <Typography variant="title3">{city}</Typography>
        <div>
          <Typography variant="title1">{time}</Typography>
          <Typography variant="body2">{date}</Typography>
        </div>
      </div>
    </div>
  );
};

export default CityTimeCard;
