import React, { useEffect, useRef, useState, useCallback } from "react";
import Typography from "../../web-building-blocks/Atoms/Typography";
import { getTime } from "../../web-building-blocks";
import { Skeleton } from "../../web-building-blocks/Atoms";
import Icon from "../../utils/Icon";
import { HourlyForecastResponse } from "../../apis/api/types";

interface HourlyForecastProps {
  data: HourlyForecastResponse[];
  loading: boolean;
}

const HourCard: React.FC<HourlyForecastResponse> = (data) => {
  const getRotation = (direction: HourlyForecastResponse["wind_dir"]) => {
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
  const { time, temp_c, condition, wind_kph, icon, wind_dir, is_day } = data;
  return (
    <div
      className={`w-32 h-[270px] ${
        is_day ? "hourly-card-bg-is-day" : "hourly-card-bg"
      }  rounded-card flex flex-col items-center flex-shrink-0 transition-transform duration-200 `}
    >
      {/* Hour */}
      <Typography variant="subtitle2-strong" className="font-bold mt-2 md:mt-3">
        {getTime(time)}
      </Typography>

      {/* Weather Icon */}
      <div className="">
        <img src={icon} alt={condition} className="w-[90px] h-[90px]" />
      </div>

      {/* Temperature */}
      <Typography variant="subtitle2" className="font-bold mt-1">
        {Math.round(temp_c)}°C
      </Typography>

      {/* Wind Direction */}
      <div className="mt-1 md:mt-2">
        <Icon name="navigation" size={55} direction={getRotation(wind_dir)} />
      </div>

      {/* Wind Speed */}
      <Typography variant="subtitle2" className="font-bold  ">
        {Math.round(wind_kph)}km/h
      </Typography>
    </div>
  );
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, loading }) => {
  // State for tracking mouse position and scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse event handlers for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainer.offsetLeft);
    setScrollLeft(scrollContainer.scrollLeft);
    // Add cursor grabbing class
    scrollContainer.classList.add("cursor-grabbing");
    document.body.classList.add("select-none");
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const scrollContainer = scrollContainerRef.current;
      if (!isDragging || !scrollContainer) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Increased scroll speed multiplier for smoother feel
      scrollContainer.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove("cursor-grabbing");
    }
    document.body.classList.remove("select-none");
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft, handleMouseMove]);

  if (loading) {
    return (
      <Skeleton
        styleClasses={{
          skeleton: "w-auto h-[366px] p-12 rounded-panel shadow-panel",
        }}
      />
    );
  }

  return (
    <div className="w-auto h-[366px] text-center bg-card-bg rounded-panel shadow-panel p-2 md:p-4">
      <div className="flex flex-col h-full lg:px-20">
        {/* Title */}
        <div className="flex justify-center mb-4">
          <Typography variant="title5" className="font-bold">
            Hourly Forecast:
          </Typography>
        </div>

        {/* Hour Cards - with scrolling that hides scrollbar */}
        <div className="relative h-full">
          <div
            className="absolute inset-0 overflow-x-auto scrollbar-hide cursor-grab hover:cursor-grab touch-pan-x snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
          >
            {/* Custom CSS to hide scrollbar in WebKit browsers */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `,
              }}
            />

            <div className="flex gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 items-center h-full ">
              {data.map((hour, index) => (
                <div key={index} className="snap-start">
                  <HourCard {...hour} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
