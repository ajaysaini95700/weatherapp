import { Component,ViewChild } from '@angular/core';
import { NavController, Platform,Slides,LoadingController  } from 'ionic-angular';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slideRef') slide: Slides;;
  cityName: string;
  slides =[];
  bgImage: string;
  loader:any;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public geolocation: Geolocation,
    public weatherService: WeatherServiceProvider,
    public locationService:LocationServiceProvider) {
      this.loader = this.loadingCtrl.create({
        content: "Please wait..."
      });

  }

  ionViewDidLoad()
  {
    this.platform.ready().then(() => {
      this.locationService.getLocation().then(resp=>{
         console.log("location",resp);
         this.loader.present();
         this.weatherService.getCurrentWeather(resp.coords.longitude, resp.coords.latitude)
          .subscribe(res => {
            console.log("res",res);
            this.loader.dismiss();
            if(res.length > 0){
              this.bgImage = this.BgImage(res[0].main);
              this.cityName = res[0].name;
              this.slides.push({
                id: res[0].id,
                icon: `http://openweathermap.org/img/w/${res[0].weather[0].icon}.png`,
                current: res[0],
                forecast: res[1]
              });
            }
          });
      })
      .catch(err=>{
        console.log("erro",err);
      })
    });
  }

  slideChanged() {
    let index = this.slide.getActiveIndex();
    console.log(index);
    if(this.slides[index])
    {
      let name = this.slides[index].current.name;
      this.cityName = name;
      this.bgImage = this.BgImage(this.slides[index].current.weather[0].main);
    }
  }

  GetDay = (time: number) => {
      let day = new Date(time*1000).toISOString();
      let d = new Date(day);
      let weekday = [];
      weekday[0] = "Sun";
      weekday[1] = "Mon";
      weekday[2] = "Tues";
      weekday[3] = "Wed";
      weekday[4] = "Thurs";
      weekday[5] = "Fri";
      weekday[6] = "Sat";

      let n = weekday[d.getDay()];
      return n;
  }

  GetDate = (time: number) => {
      let day = moment(time*1000).format("DD/MM");
      return day;
  }

  windDirection = (deg) => {
      if (deg > 11.25 && deg < 33.75){
        return "NNE";
      }else if (deg > 33.75 && deg < 56.25){
        return "ENE";
      }else if (deg > 56.25 && deg < 78.75){
        return "E";
      }else if (deg > 78.75 && deg < 101.25){
        return "ESE";
      }else if (deg > 101.25 && deg < 123.75){
        return "ESE";
      }else if (deg > 123.75 && deg < 146.25){
        return "SE";
      }else if (deg > 146.25 && deg < 168.75){
        return "SSE";
      }else if (deg > 168.75 && deg < 191.25){
        return "S";
      }else if (deg > 191.25 && deg < 213.75){
        return "SSW";
      }else if (deg > 213.75 && deg < 236.25){
        return "SW";
      }else if (deg > 236.25 && deg < 258.75){
        return "WSW";
      }else if (deg > 258.75 && deg < 281.25){
        return "W";
      }else if (deg > 281.25 && deg < 303.75){
        return "WNW";
      }else if (deg > 303.75 && deg < 326.25){
        return "NW";
      }else if (deg > 326.25 && deg < 348.75){
        return "NNW";
      }else{
        return "N"; 
      }
  }

  BgImage = (val) => {
    //let val = this.navParams.get("weatherInfo")
    if(val == "Rain"){
      return './assets/imgs/rain.jpg';
    } else if(val == "Clear"){
      return './assets/imgs/clear.jpg';
    } else if(val == "Clouds"){
      return './assets/imgs/clouds.jpg';
    } else if(val == "Drizzle"){
      return './assets/imgs/drizzle.jpg';
    } else if(val == "Snow"){
      return './assets/imgs/snow.jpg';
    } else if(val == "ThunderStorm"){
      return './assets/imgs/thunder.jpg';
    } else {
      return './assets/imgs/clear.jpg';
    }
  }

}
