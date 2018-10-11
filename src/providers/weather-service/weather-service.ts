import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherServiceProvider {

  //get api key from https://home.openweathermap.org/
  apiKey = '8fe62f61cc6e8e5dd5b16db2f0813e8b';
  url;

  constructor(public http: HttpClient) {
    console.log('Hello WeatherServiceProvider Provider');
  }

  //get weather and forecast 
  getCurrentWeather(lon: number, lat: number): Observable<any> {
    const currentInfo = this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${this.apiKey}`);
    const forecastInfo = this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&APPID=${this.apiKey}`);

    return Observable.forkJoin([currentInfo,forecastInfo])
      .map(responses => {
        return [].concat(...responses);
      });
  }
}
