import React, { useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { MultipleSelector } from "../../web-building-blocks/Atoms/MultipleSelector";
import { Button } from "../../web-building-blocks/Atoms";
import { IoSearchOutline } from "react-icons/io5";
import { Typography } from "../../web-building-blocks/Atoms/Typography";
import { useWeatherSearch } from "../../apis/hooks/useAuth";
import Icon from "../../utils/Icon";
import type { Option } from "../../web-building-blocks/Atoms/MultipleSelector/types";
import Spinner from "../../web-building-blocks/Atoms/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../../utils/authAtom";
import { clearTokens } from "../../utils/tokenManager";
interface HeaderProps {
  setCurrentLocation: (city: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, loading: searchLoading } = useWeatherSearch(searchQuery, !!searchQuery);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(undefined);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();
  console.log("searchResults", searchResults);
  // Transform search results to option format
  // const searchOptions = searchResults.map((item) => ({
  //   label: `${item.name}, ${item.region}, ${item.country}`,
  //   value: `${item.name}, ${item.region}, ${item.country}`,
  // }));

  const handleCurrentLocation = async () => {
    try {
      setSelectedOption(undefined); // Clear the input and selection
      setCurrentLocationLoading(true); // Start loading
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        setCurrentLocationLoading(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude},${longitude}`;
          setCurrentLocation(locationString);
          setCurrentLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please search manually.");
          setCurrentLocationLoading(false);
        }
      );
    } catch (error) {
      console.error("Error in handleCurrentLocation:", error);
      setCurrentLocationLoading(false);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    if (selectedLocation) {
      setCurrentLocation(selectedLocation);
    }
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null, isLoading: false });
    // Optionally clear tokens/cookies here
    clearTokens();
    navigate("/login");
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 md:px-14 xl:px-24 sm:p-6 bg-gradient-to-b gap-4 sm:gap-0">
      {/* Dark Mode Toggle */}
      <div className="flex  items-center sm:mr-4 ">
        <ThemeToggle />
         {/* Logout Button */}

      </div>
     
      {/* Search Bar */}
      <div className="w-full sm:w-[60%] lg:w-[50%]">
        <MultipleSelector
          mode="single"
          emptyIndicator={searchLoading ? "Loading..." : "No results found"}
          loadingIndicator={searchLoading ? "Loading..." : ""}
          onSearchSync={(value) => {
            if (value) {
              setSearchQuery(value);
            }
            return searchResults.map((item) => ({
              label: `${item.name}, ${item.region}, ${item.country}`,
              value: `${item.name}, ${item.region}, ${item.country}`,
            }));
          }}
          options={searchResults.map((item) => ({
            label: `${item.name}, ${item.region}, ${item.country}`,
            value: `${item.name}, ${item.region}, ${item.country}`,
          }))}
          value={selectedOption}
          onChange={(value) => {
            if (value) {
              const selected = Array.isArray(value) ? value[0] : value;
              setSelectedOption(selected);
              handleLocationSelect(selected.value);
            } else {
              setSelectedOption(undefined);
            }
          }}
          inputPlaceholder="Search for your preferred city..."
          className="search-bar flex items-center px-4 py-2 h-[62px] rounded-full bg-search-bg shadow-button w-full mx-auto text-search-text placeholder-search-placeholder text-sm outline-none border-none"
          styleClasses={{
            searchInputProps:
              "bg-transparent w-full text-search-text placeholder-search-placeholder text-sm outline-none border-none",
          }}
          icon={<IoSearchOutline className="h-5 w-5" />}
          mainIcon={<IoSearchOutline className="h-[46px] w-[48px]" />}
        />
      </div>

      {/* Current Location Button */}
      <div className="flex  items-center sm:mr-4">
      <Button
        dataTestId="button-1"
        buttonStyle="current-location-btn w-full sm:w-[200px] lg:w-[260px] h-[62px] flex justify-center rounded-full bg-current-location-bg text-current-location-text font-semibold text-base shadow-button hover:bg-green-600 transition-colors duration-200"
        onClick={handleCurrentLocation}
        disabled={currentLocationLoading}
      >
        <div className="flex justify-evenly items-center gap-2">
          {currentLocationLoading ? (
            <Spinner size="medium" />
          ) : (
            <>
              <Icon name="currentLocation" size={35} />
              <Typography variant="subtitle1" className="mx-2 text-primary-light font-extrabold">
                Current Location
              </Typography>
            </>
          )}
        </div>
      </Button>
      <Button
        buttonStyle="logout-btn  w-full  sm:w-[120px] h-[48px] flex justify-center rounded-full bg-red-500 text-white font-semibold text-base shadow-button hover:bg-red-600 transition-colors duration-200 ml-2"
        onClick={handleLogout}
      >
        Logout
      </Button>
      </div>
    </header>
  );
};

export default Header;