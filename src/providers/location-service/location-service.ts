import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the LocationServiceProvider provider.
*/
@Injectable()
export class LocationServiceProvider {

  constructor(public http: HttpClient,private geolocation: Geolocation) {
    console.log('Hello LocationServiceProvider Provider');
  }

  //Get current location for accessing weather
  getLocation()
  {
    return this.geolocation.getCurrentPosition();
  }

}
