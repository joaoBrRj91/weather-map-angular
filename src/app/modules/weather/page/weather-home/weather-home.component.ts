import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Observable } from 'rxjs';
import { IWeathersData } from 'src/app/models/interfaces/IWeathersData';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit {
  initialCityName: string = 'São Paulo';
  wheathersData!: IWeathersData;

  constructor(private wheaterService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.wheaterService.getWeatherDatas(cityName).subscribe({
      next: (response) => {
        response && (this.wheathersData = response);
        console.log(this.wheathersData.sys);
      },
      error: (error) => console.log(error),
    });
  }
}
