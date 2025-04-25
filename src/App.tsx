import "./App.css";
import "./index.css";
import { WeatherDetails } from "./components/WeatherDetails";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import "./styles/theme.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="weather-dashboard-theme">
      <div className="min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold text-foreground">
            Weather Dashboard
          </h1>
          <ThemeToggle />
        </header>
        <main className="container mx-auto p-4 space-y-8">
          <WeatherDetails temperature={20} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
