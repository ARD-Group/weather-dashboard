import React from "react";

import { ThemeToggle } from "../ThemeToggle";
import { MultipleSelector } from "../../web-building-blocks/Atoms/MultipleSelector";
import { Button } from "../../web-building-blocks/Atoms";
import { BiCurrentLocation } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-gradient-to-b gap-4 sm:gap-0">
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
          onSearchSync={() => []}
          options={[
            { label: "nextjs", value: "nextjs" },
            { label: "React", value: "react" },
          ]}
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
        buttonStyle="current-location-btn w-full sm:w-[200px] lg:w-[292px] h-[62px] flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-current-location-bg text-current-location-text font-semibold text-base shadow-button hover:bg-green-600 transition-colors duration-200"
        onClick={() => {}}
      >
        <React.Fragment key=".0">
          <BiCurrentLocation className="h-[35px] w-[35px]" />
          <p className="hidden sm:block">Current Location</p>
        </React.Fragment>
      </Button>
    </header>
  );
};

export default Header;
