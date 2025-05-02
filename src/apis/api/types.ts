export interface SignUpResponse {}

export interface VerifyEmailResponse {}

export interface ResendEmailResponse {}

export interface LoginResponse {
  tokenType: string;
  roleType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface WeatherSearchResponse {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherCurrentResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
    tz: string;
  };
  current: {
    temp_c: number;
    feels_like_c: number;
    condition: string;
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    uv: number;
    icon: string;
    is_day: number;
    astronomy: {
      sunrise: string;
      sunset: string;
    };
  };


  daily_forecast: {
    date: string;
    max_temp_c: number;
    min_temp_c: number;
    avg_temp_c: number;
    condition: string;
    icon: string;
    hourly_forecast: HourlyForecastResponse[];
  }[];
}

export interface HourlyForecastResponse {
  time: string;
  temp_c: number;
  condition: string;
  wind_kph: number;
  icon: string;
  is_day: number;
  wind_dir: "N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW";
}

