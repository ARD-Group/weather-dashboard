import React from "react";
import { useRecoilValue } from "recoil";
import { timeState } from "../atoms/timeAtom";
import CityTimeCard from "../components/CityTimeCard";

const TimePage: React.FC = () => {
  const timeData = useRecoilValue(timeState);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <CityTimeCard
        city={timeData.city}
        time={timeData.time}
        date={timeData.date}
      />
    </div>
  );
};

export default TimePage;
