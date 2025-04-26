import { trpcClient } from "../trpc";

type GetWeatherOutput = {
  weather: string;
};

export const getWeather = async (): Promise<GetWeatherOutput> => {
  const query = await trpcClient.weather.getWeatherData.query();
  return query;
};
