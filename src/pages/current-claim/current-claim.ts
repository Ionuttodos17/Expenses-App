import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams, Popover} from 'ionic-angular';
import {JourneyPage} from "../journey/journey";
import {PopoverController} from 'ionic-angular';
import {Popover1Page} from "../popover1/popover1";
import {ExpenseFormPage} from "../expense-form/expense-form";
import {Storage} from "@ionic/storage";
import {AllData} from "../../providers/allData/allData";
import {ClaimService} from "../../providers/claim/claimService";



@IonicPage()
@Component({
  selector: 'page-current-claim',
  templateUrl: 'current-claim.html',
})
export class CurrentClaimPage implements OnInit{


  distance: any = 0;


  private allEntries: any [] = [];
  public price:any = 0;
  public beginDate: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private alertCtrl: AlertController,
              public popoverCtrl: PopoverController,
              private storage: Storage,
              private allData: AllData,
              private claimService: ClaimService
            ) {
  }


  ionViewWillEnter() {

    this.allEntries = this.allData.loadEntries();
    let b : number=0
    for (let entrie of this.allEntries){
      console.log(b)
      b = b + ((entrie.price*1)||(entrie.distance*0.11))

    }
    this.price = b.toFixed(2)

    if ( this.allEntries.length !==0 ){
      this.beginDate = this.allEntries[this.allEntries.length-1].date;

    }
    else { this.beginDate = '' }
  }


    ngOnInit() {
      this.allData.fetchEntries().then((entries:any)=> {this.allEntries = entries
        let b : number=0
        for (let entrie of this.allEntries){
 //         console.log(b)
          b = b+ ((entrie.price*1)||(entrie.distance*0.11))
 //         console.log(b)
 //         console.log(typeof b)
        }
        this.price = b.toFixed(2)

        if ( this.allEntries.length !==0 ){
          this.beginDate = this.allEntries[this.allEntries.length-1].date;

        }
        else { this.beginDate = '' }

      })
      }

  onOpenMenu() {
    this.menuCtrl.open();
  }


  onFinnishClaim(){
    this.presentConfirm()

  }

  onLoadNewJourney() {
    this.navCtrl.push(JourneyPage);
  }

  onLoadNewExpense() {
    this.navCtrl.push(ExpenseFormPage);
  }

  presentPopover(myEvent) {
    let popover: Popover;
    popover = this.popoverCtrl.create(Popover1Page);
    popover.present({
      ev: myEvent
    });
  }

  presentPopover1() {
    let popover: Popover;
    popover = this.popoverCtrl.create(Popover1Page);
    popover.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm concluding claim?',
      message: 'Finnish this claim?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.claimService.addClaim(this.allData.loadEntries());
            this.allData.deleteAllEntries();
            this.allData.allEntries =[];
            this.navCtrl.pop();
            console.log('Confirm clicked');
          }
        }
      ],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }
}

