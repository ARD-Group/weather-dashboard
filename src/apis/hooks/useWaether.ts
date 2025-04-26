import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/adapter";
import { WeatherDetails } from "../api/types";

export const useWeather = () => {
  const { data, isLoading } = useQuery<WeatherDetails>({
    queryKey: ["weather"],
    queryFn: getWeather,
  });
  return { data, loading: isLoading };
};
