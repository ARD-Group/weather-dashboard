import { Typography } from "../../web-building-blocks/Atoms";
import { getTime,getDate } from "../../web-building-blocks/utils/time";

import React from "react";

interface CityTimeCardProps {
  data: {
    name: string;
    country: string;
    localtime: string;
    tz: string;
  };
  loading: boolean;
}

const CityTimeCard: React.FC<CityTimeCardProps> = ({ data, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const { name, localtime, tz } = data;
  console.log('getTime(localtime, tz)',getTime(localtime, tz),localtime,tz);
  
  return (
    <div className="w-full h-full text-center bg-card-bg rounded-panel shadow-panel p-12">
      {/* City name */}
      <Typography variant="title3" className="">
        {name}
      </Typography>
      <div className="flex flex-col items-center justify-center -gap-10">
        {/* Time */}
        <Typography variant="title1">{getTime(localtime, tz)}</Typography>

        {/* Date */}
        <Typography variant="body2" className="">
          {getDate(localtime, tz)}
        </Typography>
      </div>
    </div>
  );
};

export default CityTimeCard;
