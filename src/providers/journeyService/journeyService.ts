import {Journey} from "../../models/journeyModel/journey";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";


declare var cordova: any;

@Injectable()

export class JourneyService {

  private journey : Journey;
  private journeys :{
    to: string,
    from: string,
    description: string,
    distance: number,
    date: Date
  } [] = [];

  constructor (private storage: Storage){}

  public addJourney(to: string,
                    from: string,
                    description: string,
                    distance: number,
                    date: Date ){
    const thisJourney: {to: string,
      from: string,
      description: string,
      distance: number,
      date: Date}=
      {to, from, description, distance, date}
    this.journeys.push({to, from, description, distance, date});
    this.storage.set('journeys', this.journeys).then().catch(err => {
      this.journeys.splice(this.journeys.indexOf(thisJourney), 1);
    })
  }

  public loadJourneys(){
    return this.journeys.slice();
  }

  public fetchJourneys(){
    return this.storage.get('journeys')
      .then(
        (journeys: {to: string,
          from: string,
          description: string,
          distance: number,
          date: Date}[]) => {
          this.journeys = journeys != null ? journeys : [];
          return this.journeys;
        }
      )
      .catch(
        err => console.log(err)
      );
  }

}
