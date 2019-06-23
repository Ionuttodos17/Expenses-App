import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Base64} from "@ionic-native/base64";


@IonicPage()
@Component({
  selector: 'page-expense-view',
  templateUrl: 'expense-view.html',
})
export class ExpenseViewPage {
  aSrc64:string;
  index:number;
  expense: {description: any, price: number, type: any, date: Date, imageURL: string, base64Str: string};
  picture: string;
  aBase64:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public base64File: Base64 ) {
    this.index = this.navParams.get('index');
    this.expense = this.navParams.get('anExpense');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseViewPage');
    this.picture = this.expense.imageURL;
    this.aBase64 = this.expense.base64Str;
/*
    this.base64File.encodeFile(this.expense.imageURL).then((value:string)=>{
    this.aSrc64 = value.replace('*;charset=utf-8','jpeg');
    this.aSrc64 = this.aSrc64.slice(0,100);
    })
*/
  }

}
