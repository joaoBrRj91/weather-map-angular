import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'f0bef4a5bada624f8236623a4dcbd31d';
  private urlWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=cityName&units=metric&mode=json&APPID=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  getWeatherDatas(
    cityNameUpdated: string,
    cityNameCurrent?: string
  ): Observable<any> {
    if (cityNameCurrent)
      this.urlWeatherApi = this.urlWeatherApi.replace(
        cityNameCurrent,
        cityNameUpdated
      );
    else
      this.urlWeatherApi = this.urlWeatherApi.replace(
        'cityName',
        cityNameUpdated
      );

    return this.http.get(this.urlWeatherApi, {});
  }
}
