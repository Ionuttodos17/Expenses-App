import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-link-to-business',
  templateUrl: 'link-to-business.html',
})
export class LinkToBusinessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkToBusinessPage');
  }

  onOpenMenu() {
    this.menuCtrl.open();
  }

}
