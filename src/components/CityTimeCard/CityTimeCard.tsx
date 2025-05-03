import { Skeleton, Typography } from "../../web-building-blocks/Atoms";
import { getTime, getDate } from "../../web-building-blocks/utils/time";
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
    return (
      <Skeleton
        styleClasses={{
          skeleton: 'w-auto h-[330px] p-12 rounded-panel shadow-panel'
        }}
      />
    );
  }

  const { name, localtime, tz } = data;
  
  return (
    <div className="w-auto h-[330px] text-center bg-card-bg rounded-panel shadow-panel p-12">
      {/* City name */}
      <Typography 
        variant="title3" 
        className="text-text mb-4"
      >
        {name}
      </Typography>

      {/* Time */}
      <Typography 
        variant="title1" 
        className=" text-text mb-2"
      >
        {getTime(localtime, tz)}
      </Typography>

      {/* Date */}
      <Typography 
        variant="body2" 
        className="-m-7"
      >
        {getDate(localtime, tz)}
      </Typography>
    </div>
  );
};

export default CityTimeCard;