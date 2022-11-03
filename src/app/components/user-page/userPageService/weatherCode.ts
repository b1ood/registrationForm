export interface WeatherInterface {
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
