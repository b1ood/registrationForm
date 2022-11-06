export interface WeatherInterface {
  utc_offset_seconds: number;
  hourly: {
    cloudcover: [0],
    precipitation: [0],
  },
  current_weather: {
    temperature: number,
    weathercode: number;
    winddirection: number,
    windspeed: number,
  }
}
