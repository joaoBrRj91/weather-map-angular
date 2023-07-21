import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IWeathersData } from 'src/app/models/interfaces/IWeathersData';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName: string = 'São Paulo';
  wheathersData!: IWeathersData;
  searchIcon = faMagnifyingGlass;

  constructor(private wheaterService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.wheaterService
      .getWeatherDatas(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.wheathersData = response);
          console.log(this.wheathersData.sys);
        },
        error: (error) => console.log(error),
      });
  }

  onSubmit() : void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  //Resolve memory Leek
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
