import { Header, WeatherDetails } from "../../components";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 space-y-8">
        <WeatherDetails temperature={20} />
      </main>
    </div>
  );
};

export default Dashboard;
