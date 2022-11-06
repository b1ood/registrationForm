import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeatherInterface} from "./weatherCode";

@Injectable({
  providedIn: 'root'
})
export class UserPageService {

  name = 'Moscow'
  latitude = '55.7558';
  longitude = '37.6176';

  constructor(private http: HttpClient) {
  }

  getWeatherData(): Observable<WeatherInterface> {
    return this.http.get<WeatherInterface>
    (`https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&hourly=precipitation,cloudcover,windspeed_80m,winddirection_80m,temperature_120m&current_weather=true&windspeed_unit=ms&timezone=Europe%2F${this.name}`)
  }
}
