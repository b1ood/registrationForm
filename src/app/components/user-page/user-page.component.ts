import {Component, OnInit} from '@angular/core';
import {UserPageService} from "./userPageService/userPage.service";
import {weatherCode} from "./userPageService/weatherCodeDescription";
import {location} from "./userPageService/weatherCodeDescription";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public status = false;
  public waitingData = '1';
  public date: string;
  public time: string;
  private UTC = 0;
  public temp: number | string = 'N/A';
  public cloudiness: number | string = 'N/A';
  public precipitation: number | string = 'N/A';
  public windDirection: string = 'N/A';
  public windSpeed: number | string = 'N/A';
  public weatherCode: string = '/assets/images/weatherCodes/na.svg';
  public isDisabled = false;

  public isNight = false;

  constructor(private userPageService: UserPageService) {
  }

  ngOnInit(): void {
    this.getWeather();
  }

  private getDate() {
    let currentDate = new Date();
    let dd: string | number = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: string | number = currentDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: string | number = currentDate.getFullYear();
    if (yy < 10) yy = '0' + yy;

    let hh: string | number = currentDate.getUTCHours() + this.UTC;
    if (hh < 10) hh = '0' + hh;
    if (hh === 24) hh = 0;
    this.isNight = hh >= 22 || hh <= 4;

    let min: string | number = currentDate.getMinutes();
    if (min < 10) min = '0' + min;

    this.date = yy + '.' + mm + '.' + dd;
    this.time = hh + ':' + min;

    setTimeout(() => {
      this.getDate()
    }, 1000)
  }

  private getWeather() {
    this.waitingData = '.7'
    this.status = true;
    this.isDisabled = true;
    this.userPageService.getWeatherData()
      .subscribe((value => {
          this.temp = value.current_weather.temperature;
          this.cloudiness = value.hourly.cloudcover[0];
          this.precipitation = value.hourly.precipitation[0];
          this.windSpeed = value.current_weather.windspeed;
          this.UTC = value.utc_offset_seconds / 3600;
          const direction = value.current_weather.winddirection;
          const code = value.current_weather.weathercode;
          this.getDate();

          if (direction <= 22 || direction >= 319) {
            this.windDirection = 'N';
          } else if (direction >= 23 && direction <= 68) {
            this.windDirection = 'N-E';
          } else if (direction >= 69 && direction <= 112) {
            this.windDirection = 'E';
          } else if (direction >= 113 && direction <= 158) {
            this.windDirection = 'S-E';
          } else if (direction >= 159 && direction <= 202) {
            this.windDirection = 'S';
          } else if (direction >= 203 && direction <= 248) {
            this.windDirection = 'S-W';
          } else if (direction >= 249 && direction <= 292) {
            this.windDirection = 'W';
          } else if (direction >= 293 && direction <= 318) {
            this.windDirection = 'N-W';
          }

          for (let [key, value] of Object.entries(weatherCode)) {
            if (code === +key) {
              this.weatherCode = '/assets/images/weatherCodes/' + value + '.svg';
              if (this.isNight && +key <= 2) {
                this.weatherCode = '/assets/images/weatherCodes/night-' + value + '.svg';
              }
            }
          }

        }),
        err => {
          throw err;
        },
        () => {
          setTimeout(() => {
            this.waitingData = '1'
            this.status = false;
            this.isDisabled = false;
          }, 700);
        });
    setTimeout(() => {
      this.getWeather();
    }, 1000 * 60 * 30)
  }

  changeLocation(event: any) {
    let selectLocation = event.target.value;
    for (let i = 0; i < Object.keys(location).length; i++) {
      if (selectLocation === Object.keys(location)[i]) {
        this.userPageService.name = Object.values(location)[i].name;
        this.userPageService.latitude = Object.values(location)[i].latitude;
        this.userPageService.longitude = Object.values(location)[i].longitude;
        this.getWeather();
      }
    }
  }
}
