import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import  {ActionSheetController} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-acc-settings',
  templateUrl: 'acc-settings.html',
})
export class AccSettingsPage {

  private name: any;
  private companyName: any;
  private rate: number;
  private regNumber: any;
  private motExpDate: any;
  private insExpDate:any;

  private accSettings : {name: any,companyName: any,rate: number,regNumber: any,motExpDate: any,insExpDate:any};


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private menuCtrl: MenuController,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccSettingsPage');
    this.fetchAccSettings();
    this.loadAccSettings();
  }

  onOpenMenu() {
    this.menuCtrl.open();
  }

  public onSubmit(form: NgForm){

    this.name = form.value.uName;
    this.companyName = form.value.companyName;
    this.rate = form.value.rate;
    this.regNumber = form.value.regNumber;
    this.motExpDate = form.value.motExpDate;
    this.insExpDate = form.value.insExpDate;

    this.accSettings = {name:this.name,companyName: this.companyName,rate: this.rate,regNumber: this.regNumber,
      motExpDate: this.motExpDate,insExpDate:this.insExpDate};
    this.addSettings(this.accSettings)
    console.log(this.accSettings);
  //  this.addRate(this.rate);
  //  form.reset();
  }

  public addSettings({}) {

    this.storage.set('accSettings', this.accSettings)
    this.storage.set('rate', this.rate)
      .then()
      .catch(err => {
        console.log(err)
      })
  }

  public loadAccSettings() {
    return this.accSettings;
  }

  public fetchAccSettings() {
    return this.storage.get('accSettings')
      .then(
        (accSettings:{name:any, companyName:any, rate: number, regNumber: any, motExpDate: Date, insExpDate: Date}) => {
          this.accSettings = accSettings != null ? accSettings : undefined;
          return this.accSettings;

        }
      )
      .catch(
        err => console.log(err)
      );
  }
}
