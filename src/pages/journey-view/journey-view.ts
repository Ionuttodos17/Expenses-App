import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-journey-view',
  templateUrl: 'journey-view.html',
})
export class JourneyViewPage {

  index: number;
  journey: {to:string, from:string, description:string, distance:number, date:Date};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.index = this.navParams.get('index');
    this.journey = this.navParams.get('anExpense');
    console.log(this.journey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyViewPage');
  }

}
