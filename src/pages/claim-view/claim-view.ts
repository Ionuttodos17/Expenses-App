import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ExpenseViewPage} from "../expense-view/expense-view";
import {JourneyViewPage} from "../journey-view/journey-view";


//@IonicPage()
@Component({
  selector: 'page-claim-view',
  templateUrl: 'claim-view.html',
})
export class ClaimViewPage implements OnInit{
  claim:any;
  index:number;
  startDate:any;
  total:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.claim = this.navParams.get('claim');
    this.index = this.navParams.get('index');
    this.total = this.calculateTotal();
    this.startDate = this.getDate();
  }

  calculateTotal(){
      let b : number=0
      for (let entrie of this.claim){
        console.log(b)
        b = b + ((entrie.price*1)||(entrie.distance*0.11))

      }
      return b.toFixed(2)

    }
  getDate(){
    if ( this.claim.length !==0 ){

      console.log(this.total)
      console.log(this.startDate)
      return this.claim[this.claim.length-1].date;
    }
    else {

      console.log(this.total)
      console.log(this.startDate)
      return '' }
  }

  ngOnInit(){
    let b : number=0
    for (let entrie of this.claim){
      console.log(b)
      b = b + ((entrie.price*1)||(entrie.distance*0.11))

    }
    this.total = b.toFixed(2)

    if ( this.claim.length !==0 ){
      this.startDate = this.claim[this.claim.length-1].date;
    }
    else { this.startDate = '' }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimViewPage');
    let b : number=0
    for (let entrie of this.claim){
      console.log(b)
      b = b + ((entrie.price*1)||(entrie.distance*0.11))

    }
    this.total = b.toFixed(2)

    if ( this.claim.length !==0 ){
      this.startDate = this.claim[this.claim.length-1].date;
    }
    else { this.startDate = '' }
  }

  ionViewWillEnter() {
    let b : number=0
    for (let entrie of this.claim){
      console.log(b)
      b = b + ((entrie.price*1)||(entrie.distance*0.11))

    }
    this.total = b.toFixed(2)

    if ( this.claim.length !==0 ){
      this.startDate = this.claim[this.claim.length-1].date;
    }
    else { this.startDate = '' }
  }


  openExpOrJourney( anExpense: any ,index: number) {
    if (anExpense.to !== undefined) {
    const modal = this.modalCtrl.create(JourneyViewPage, {anExpense: anExpense, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        // this.allClaims = this.claimsService.loadClaims();
      }
    );
  }
  else{
      const modal = this.modalCtrl.create(ExpenseViewPage, {anExpense: anExpense, index: index});
      modal.present();
      modal.onDidDismiss(
        () => {
          // this.allClaims = this.claimsService.loadClaims();
        }
      );
    }
  }

}
