import { Component, Input, OnInit } from '@angular/core';
import { IWeathersData } from 'src/app/models/interfaces/IWeathersData';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: [],
})
export class WeatherCardComponent implements OnInit {
  @Input() weatherDatasInput!: IWeathersData;

  ngOnInit(): void {
    console.log(`weather-home-component input: ${this.weatherDatasInput}`);
  }
}
