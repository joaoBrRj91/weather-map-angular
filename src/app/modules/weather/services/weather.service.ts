import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'API_KEY_WEATHER_API';
  private urlWeatherApi = 
  `https://api.openweathermap.org/data/2.5/weather?q=cityName&units=metric&mode=json&APPID=${this.apiKey}`

  constructor(private http: HttpClient) { }

  getWeatherDatas(cityName: string) : Observable<any>{
    
    this.urlWeatherApi = this.urlWeatherApi.replace('cityName',cityName);

    return this.http.get(this.urlWeatherApi, {});

  }

}
