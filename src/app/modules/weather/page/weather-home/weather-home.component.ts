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
  currentCityName: string = 'Rio de Janeiro';
  updatedCityName: string = '';
  wheathersData!: IWeathersData;
  searchIcon = faMagnifyingGlass;

  constructor(private wheaterService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.currentCityName);
  }

  getWeatherDatas(cityNameUpdated: string, cityNameCurrent?: string): void {
    this.wheaterService
      .getWeatherDatas(cityNameUpdated, cityNameCurrent)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.wheathersData = response);
          console.log(this.wheathersData);
        },
        error: (error) => console.log(error),
        complete: () => (this.currentCityName = this.wheathersData.name),
      });
  }

  onSubmit(): void {
    this.getWeatherDatas(this.updatedCityName, this.currentCityName);
  }

  //Resolve memory Leek
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
