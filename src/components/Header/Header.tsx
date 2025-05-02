import React from "react";

import { ThemeToggle } from "../ThemeToggle";
import { MultipleSelector } from "../../web-building-blocks/Atoms/MultipleSelector";
import { Button } from "../../web-building-blocks/Atoms";
import { BiCurrentLocation } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { Typography } from "../../web-building-blocks/Atoms/Typography";
import { weatherSearch } from "../../apis/api/adapter";

const Header: React.FC<{ setCurrentLocation: (city: string) => void }> = ({
  setCurrentLocation,
}) => {
  const handleCurrentLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const { latitude, longitude } = position.coords;
      const response = await weatherSearch({ q: `${latitude},${longitude}` });
      setCurrentLocation(
        `${response.data[0].name}, ${response.data[0].region}, ${response.data[0].country}`
      );
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 md:px-14 xl:px-24 sm:p-6 bg-gradient-to-b gap-4 sm:gap-0">
      {/* Dark Mode Toggle */}
      <div className="flex flex-col items-center sm:mr-4">
        <ThemeToggle />
      </div>
      {/* Search Bar */}
      <div className="w-full sm:w-[60%] lg:w-[50%]">
        <MultipleSelector
          mode="single"
          emptyIndicator="No results found"
          loadingIndicator="Loading..."
          onSearch={async (value) => {
            const response = await weatherSearch({ q: value });
            console.log(response);
            return response.data.map((item) => ({
              label: `${item.name}, ${item.region}, ${item.country}`,
              value: item.name,
            }));
          }}
          options={[]}
          inputPlaceholder="Search for your preferred city..."
          className="search-bar flex items-center px-4 py-2 rounded-full bg-search-bg shadow-button w-full mx-auto text-search-text placeholder-search-placeholder text-sm outline-none border-none"
          styleClasses={{
            searchInputProps:
              "bg-transparent w-full text-search-text placeholder-search-placeholder text-sm outline-none border-none",
          }}
          icon={<IoSearchOutline className="h-5 w-5" />}
          mainIcon={<IoSearchOutline className="h-[46px] w-[48px]" />}
        />
      </div>
      {/* Current Location Button */}
      <Button
        dataTestId="button-1"
        buttonStyle="current-location-btn w-full sm:w-[200px] lg:w-[260px] h-[62px] flex  justify-center    rounded-full bg-current-location-bg text-current-location-text font-semibold text-base shadow-button hover:bg-green-600 transition-colors duration-200"
        onClick={handleCurrentLocation}
      >
        <div className="flex justify-evenly items-center gap-2">
          <BiCurrentLocation className="h-[35px] w-[35px] " />
          <Typography variant="subtitle1" className="font-bold mx-6">
            Current Location
          </Typography>
        </div>
      </Button>
    </header>
  );
};

export default Header;
