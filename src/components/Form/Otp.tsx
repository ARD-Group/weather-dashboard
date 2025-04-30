import React from "react";

import { ThemeToggle } from "../ThemeToggle";
import { MultipleSelector } from "../../web-building-blocks/Atoms/MultipleSelector";
import { Locate } from "lucide-react";
import { Button } from "../../web-building-blocks/Atoms";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-gradient-to-b from-black/60 to-black/10">
      {/* Dark Mode Toggle */}
      <div className="flex flex-col items-center mr-4">
        <ThemeToggle />
      </div>
      {/* Search Bar */}
      <div className="mx-4 w-[803px]">
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
          className="search-bar flex items-center px-4 py-2 rounded-full bg-search-bg shadow-button w-full  mx-auto text-search-text placeholder-search-placeholder text-sm outline-none border-none"
          styleClasses={{
            searchInputProps:
              "bg-transparent w-full text-search-text placeholder-search-placeholder text-sm  outline-none border-none",
          }}
        />
      </div>
      {/* Current Location Button */}
      <Button
        dataTestId="button-1"
        buttonStyle="current-location-btn w-[292px] h-[62px] flex items-center gap-2 px-6 py-2 rounded-full bg-current-location-bg text-current-location-text font-semibold text-base shadow-button hover:bg-green-600  transition-colors duration-200"
        onClick={() => {}}
      >
        <Locate className="h-5 w-5" />
        Current Location
      </Button>
    </header>
  );
};

export default Header;
