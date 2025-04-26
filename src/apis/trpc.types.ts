import type { AppRouter } from "service-side-path";

import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

// Base type inferences
type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

// Weather
export type GetWeatherDataInput = RouterInputs["weather"]["getWeatherData"];
export type GetWeatherDataOutput = RouterOutputs["weather"]["getWeatherData"];
