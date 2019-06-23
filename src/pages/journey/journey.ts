import {Component, ElementRef, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform,ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import { ViewChild } from '@angular/core';

import {JourneyService} from "../../providers/journeyService/journeyService";
import {Journey} from "../../models/journeyModel/journey";
import {AllData} from "../../providers/allData/allData";

declare var google;

@Injectable()
@IonicPage()
@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html',
})
export class JourneyPage {


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'preston lancashire uk';
  end = 'preston lancashire uk';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  distance: any = 0;
  matrixService = new google.maps.DistanceMatrixService;

  constructor(public navCtrl: NavController,
              private journeyService: JourneyService,
              private allData: AllData,
  ) {

  }

  ionViewDidLoad() {
    this.initMap();
  }

  onSubmit(form: NgForm) {

    const description = form.value.description;
   // const to = form.value.to;
    const to = this.end;
      //form.value.to;
   //   this.start;
  //  const from = form.value.from;
    const from = this.start;
      //form.value.from;
    //  this.end;
    const distance = form.value.distance;
    const date = form.value.myDate;

    console.log(description, to, from, distance, date);

    const thisJourney:{to:string, from:string, description:string, distance:number, date:Date} = {to, from, description, distance, date};
    this.journeyService.addJourney(to, from, description, distance, date);
    this.allData.addEntrie(thisJourney);
    form.reset();
    this.navCtrl.pop();

/*
    const entrie: { to: any, from: any, description: any, distance: any, date: Date } =
      {description, to, from, distance, date}
    this.allData.addEntrie(entrie);
    form.reset();
    this.navCtrl.pop();
   */
  };


  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 53.765762, lng: -2.692337}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log(this.distance)
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    var origArr:any=[];
    var destArr:any=[];
    origArr.push(this.start);
    destArr.push(this.end);
    this.matrixService.getDistanceMatrix({
      origins: origArr,
      destinations: destArr,
      travelMode: 'DRIVING'
    },(response,status) =>{
      var returnedDistance = response.rows[0].elements[0].distance
      this.distance = (returnedDistance.value / 1609.34).toFixed(2);
      console.log(this.distance)
    })

  }

}
