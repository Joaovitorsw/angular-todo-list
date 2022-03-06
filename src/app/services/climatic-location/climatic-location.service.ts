import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherApiResponse } from './climatic-location.models';

@Injectable({
  providedIn: 'root',
})
export class ClimaticLocationService {
  locationEnable: boolean = false;
  readonly BASE_URL = 'http://api.weatherapi.com/v1/current.json';
  readonly API_KEY = environment.weather_api;
  private latitude: number;
  private longitude: number;
  location$: Observable<WeatherApiResponse>;
  constructor(private httpClient: HttpClient) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.latitude = coords.latitude;
      this.longitude = coords.longitude;
      this.locationEnable = true;
      this.location$ = this.getLocation();
    });
  }

  getLocation() {
    return this.httpClient
      .get<WeatherApiResponse>(
        `${this.BASE_URL}?key=${this.API_KEY}&q=${this.latitude},${this.longitude}`
      )
      .pipe(tap(console.log));
  }
}
