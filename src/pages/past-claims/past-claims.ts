import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ClaimService} from "../../providers/claim/claimService";
import {ClaimViewPage} from "../claim-view/claim-view";
import {PdfService} from "../../providers/pdfService/pdfService";
import {ResizerAndBase64} from "../../providers/resizeImgAndBase64/resizerAndBase64";


@IonicPage()
@Component({
  selector: 'page-past-claims',
  templateUrl: 'past-claims.html',
})
export class PastClaimsPage implements OnInit{

  private allClaims: any [] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private claimsService: ClaimService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private pdfService: PdfService,
              private base64Service: ResizerAndBase64,
              ) {
  }

  ioViewDidEnter(){
    this.claimsService.fetchClaims().then((claims:any)=> {
      this.allClaims = claims;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PastClaimsPage');
    this.claimsService.fetchClaims().then((claims:any)=> {
      this.allClaims = claims;
    })
  }

  ionViewWillEnter() {

    this.allClaims = this.claimsService.loadClaims();

  }

  ngOnInit() {
    this.claimsService.fetchClaims().then((claims:any)=> {
      this.allClaims = claims;
    })
  }
  deleteClaim(claim:any, index:number){
    this.claimsService.deleteClaim(index);
    this.ionViewWillEnter()
  }

  calculateClaimDistance(index : number){
    var distance: number = 0;
    for (let entrie of this.allClaims[index]){
      if (entrie.distance !== undefined){
        distance = distance + (+entrie.distance); //"+" used to convert string to int;
        //console.log(typeof entrie.distance)
      }
    }
    return distance;
  }

  calculateClaimTotal(index : number){
    var aValue: number = 0;
    for (let entrie of this.allClaims[index]){
      console.log(typeof entrie.price);
      if (entrie.price !== undefined){
        aValue = aValue +(+entrie.price);//"+" used to convert string to int;
      }
    }
    return (this.calculateClaimDistance(index)*0.11 + aValue).toFixed(2);
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
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }
public openViewClaim( claim: any ,index: number){
  const modal = this.modalCtrl.create(ClaimViewPage, {claim: claim, index: index});
  modal.present();
  modal.onDidDismiss(
    () => {
      this.allClaims = this.claimsService.loadClaims();
    }
  );
}

public createPDF(claim:any , index: number){
  this.base64Service.setBase64Arr(claim);
    this.pdfService.createPDFMaster(claim, index);
}

}
