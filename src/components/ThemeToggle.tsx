import { useTheme } from "./ThemeProvider";
import { Switch } from "../web-building-blocks/Atoms";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      dataTestId="Switch-1"
      label={theme === "light" ? "Light Mode" : "Dark Mode"}
      onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
      switchId="switch-1"
      styleClasses={{
        root: "flex  flex-col items-center justify-center min-h-[80px]  rounded-lg p-4",
        switch:
          "w-24 h-9 relative  bg-mode-toggle-bg  transition-colors duration-300  data-[state=checked]:border-black data-[state=unchecked]:bg-gray-300",
        label: "text-xs font-medium text-white mt-2",
      }}
    />
  );
}
