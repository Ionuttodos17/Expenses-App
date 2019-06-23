import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, MenuController, ModalController, NavController, NavParams} from 'ionic-angular';

import {JourneyPage} from "../journey/journey";
import {CurrentClaimPage} from "../current-claim/current-claim";
import {PastClaimsPage} from "../past-claims/past-claims";
import {AllData} from "../../providers/allData/allData";
import {ClaimService} from "../../providers/claim/claimService";
import * as HighCharts from 'highcharts';
import { Chart } from 'chart.js';

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;

  public lineChart: any;
  public barChart:any;

  private fromDateClaim: any;
  private noOfEntriesClaim: any;
  private totalClaim: any;
  private totalMileageClaim: any;
  private allEntriesClaim: any [] = [];

  private fromDateClaims: any;
  private noOfEntriesClaims: any;
  private totalClaims: any;
  private totalMileageClaims: any;
  private allEntriesClaims: any [] = [];
  public year = 2018;

  months:{Jan:{miles:number, total:number},Feb:{miles:number, total:number},Mar:{miles:number, total:number},Apr:{miles:number, total:number},
    May:{miles:number, total:number},Jun:{miles:number, total:number},Jul:{miles:number, total:number},Aug:{miles:number, total:number},
    Sep:{miles:number, total:number},Oct:{miles:number, total:number},Nov:{miles:number, total:number},Dec:{miles:number, total:number}};
 aVal:number = 230;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private modalCtrl: ModalController,
              public allData: AllData,
              public claimService: ClaimService,
  ) {
  }

  ionViewDidLoad(){
    this.months = {Jan:{miles:0,total:0},Feb:{miles:0,total:0},Mar:{miles:0,total:0},Apr:{miles:0,total:0},May:{miles:0,total:0},Jun:{miles:0,total:0},Jul:{miles:0,total:0},Aug:{miles:0,total:0},Sep:{miles:0,total:0},Oct:{miles:0,total:0},Nov:{miles:0,total:0},Dec:{miles:0,total:0}};
    this.allEntriesClaims = [];
    this.claimService.fetchClaims().then((claims: any) => {
      this.allEntriesClaim = claims;
      for (let claim of this.allEntriesClaim){
        for (let entrie of claim){
          entrie.date = new Date(entrie.date)
          console.log(entrie.date)
          console.log(new Date("2,1,2018"))
        if((entrie.date)<new Date("2,1,2018")){
          if (entrie.distance !== undefined) {
            this.months.Jan.miles = this.months.Jan.miles + +entrie.distance
            console.log(this.months.Jan.miles)
          }
          else{
            this.months.Jan.total =  this.months.Jan.total+ +entrie.price
        }
      }
      else {
          if((entrie.date)<new Date("3,1,2018")){
            if (entrie.distance !== undefined) {
              this.months.Feb.miles = this.months.Feb.miles + +entrie.distance
              console.log(this.months.Feb.miles)
            }
            else{
              this.months.Feb.total =  this.months.Feb.total+ +entrie.price
            }
          }
          else{
            if((entrie.date)<new Date("4,1,2018")){
              if (entrie.distance !== undefined) {
                this.months.Mar.miles = this.months.Mar.miles + +entrie.distance
                console.log(this.months.Mar.miles)
              }
              else{
                this.months.Mar.total =  this.months.Mar.total+ +entrie.price
              }
            }
            else{
              if((entrie.date)<new Date("5,1,2018")){
                if (entrie.distance !== undefined) {
                  this.months.Apr.miles = this.months.Apr.miles + +entrie.distance
                  console.log(this.months.Apr.miles)
                }
                else{
                  this.months.Apr.total =  this.months.Apr.total+ +entrie.price
                }
            }
            else{
                if((entrie.date)<new Date("6,1,2018")){
                  if (entrie.distance !== undefined) {
                    this.months.May.miles = this.months.May.miles + +entrie.distance
                    console.log(this.months.May.miles)
                  }
                  else{
                    this.months.May.total =  this.months.May.total+ +entrie.price
                  }
              }
              else{
                  if((entrie.date)<new Date("7,1,2018")){
                    if (entrie.distance !== undefined) {
                      this.months.Jun.miles = this.months.Jun.miles + +entrie.distance
                      console.log(this.months.Jun.miles)
                    }
                    else{
                      this.months.Jun.total =  this.months.Jun.total+ +entrie.price
                    }
                }
                else{
                    if((entrie.date)<new Date("8,1,2018")){
                      if (entrie.distance !== undefined) {
                        this.months.Jul.miles = this.months.Jul.miles + +entrie.distance
                        console.log(this.months.Jul.miles)
                      }
                      else{
                        this.months.Jul.total =  this.months.Jul.total+ +entrie.price
                      }
                  }
                  else{
                      if((entrie.date)<new Date("9,1,2018")){
                        if (entrie.distance !== undefined) {
                          this.months.Aug.miles = this.months.Aug.miles + +entrie.distance
                          console.log(this.months.Aug.miles)
                        }
                        else{
                          this.months.Aug.total =  this.months.Aug.total+ +entrie.price
                        }
                    }
                    else{
                        if((entrie.date)<new Date("10,1,2018")){
                          if (entrie.distance !== undefined) {
                            this.months.Sep.miles = this.months.Sep.miles + +entrie.distance
                            console.log(this.months.Sep.miles)
                          }
                          else{
                            this.months.Sep.total =  this.months.Sep.total+ +entrie.price
                          }
                      }
                      else{
                          if((entrie.date)<new Date("11,1,2018")){
                            if (entrie.distance !== undefined) {
                              this.months.Oct.miles = this.months.Oct.miles + +entrie.distance
                              console.log(this.months.Oct.miles)
                            }
                            else{
                              this.months.Oct.total =  this.months.Oct.total+ +entrie.price
                            }
                        }
                        else{
                            if((entrie.date)<new Date("12,1,2018")){
                              if (entrie.distance !== undefined) {
                                this.months.Nov.miles = this.months.Nov.miles + +entrie.distance
                                console.log(this.months.Nov.miles)
                              }
                              else{
                                this.months.Nov.total =  this.months.Nov.total+ +entrie.price
                              }
                          }
                          else{
                              if (entrie.distance !== undefined) {
                                this.months.Dec.miles = this.months.Dec.miles + +entrie.distance
                                console.log(this.months.Dec.miles)
                              }
                              else{
                                this.months.Dec.total =  this.months.Dec.total+ +entrie.price
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
 }
      }

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",'Aug', 'Sep', 'Nov', 'Dec'],
          datasets: [
            {
              label: "Distance",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [+this.months.Jan.miles,+this.months.Feb.miles,+this.months.Mar.miles,+this.months.Apr.miles,+this.months.May.miles,
                +this.months.Jun.miles,+this.months.Jul.miles,+this.months.Aug.miles,+this.months.Sep.miles,+this.months.Oct.miles,
                +this.months.Nov.miles,this.months.Dec.miles],
              spanGaps: false,
            }
          ]
        }

      });

      this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",'Aug', 'Sep', 'Nov', 'Dec'],
          datasets: [{
            label: 'spend',
            data: [+this.months.Jan.total,+this.months.Feb.total,+this.months.Mar.total,+this.months.Apr.total,+this.months.May.total,
              +this.months.Jun.total,+this.months.Jul.total,+this.months.Aug.total,+this.months.Sep.total,+this.months.Oct.total,
              +this.months.Nov.total,this.months.Dec.total],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }

      });

    })

  }

  ionViewWillEnter() {
    this.allEntriesClaim = [];
    this.allData.fetchEntries().then((entries: any) => {
      this.allEntriesClaim = entries
      let b: number = 0;
      let a: number = 0;
      for (let entrie of this.allEntriesClaim) {
        b = b + ((entrie.price * 1) || (entrie.distance * 0.11))
        if (entrie.distance !== undefined) {
          a = a + +entrie.distance
        }
      }
      this.totalClaim = b.toFixed(2);
      this.totalMileageClaim = a.toFixed(2);
      if (this.allEntriesClaim.length !== 0) {
        this.fromDateClaim = this.allEntriesClaim[this.allEntriesClaim.length - 1].date;
        this.noOfEntriesClaim = this.allEntriesClaim.length;
      }
      else {
        this.fromDateClaim = '';
        this.noOfEntriesClaim = 0;
      }
    })

    this.allEntriesClaims = [];
    this.claimService.fetchClaims().then((claims: any) => {
      this.allEntriesClaims = claims
      let b: number = 0;
      let a: number = 0;
      for (let claim of this.allEntriesClaims) {
        for (let entrie of claim){
          b = b + ((entrie.price * 1) || (entrie.distance * 0.11))
          if (entrie.distance !== undefined) {
            a = a + +entrie.distance
          }
        }

      }
      this.totalClaims = b.toFixed(2);
      this.totalMileageClaims = a.toFixed(2);
      if (this.allEntriesClaims.length !== 0) {
        this.fromDateClaims = this.allEntriesClaims[this.allEntriesClaims.length - 1][this.allEntriesClaims[0].length - 1].date;
        this.noOfEntriesClaims = this.allEntriesClaims.length;
      }
      else {
        this.fromDateClaims = '';
        this.noOfEntriesClaims = 0;
      }
    })
  }

  ngOnInit() {
    this.allEntriesClaim = [];
    this.allData.fetchEntries().then((entries: any) => {
      this.allEntriesClaim = entries
      let b: number = 0;
      let a: number = 0;
      for (let entrie of this.allEntriesClaim) {
        b = b + ((entrie.price * 1) || (entrie.distance * 0.11))
        if (entrie.distance !== undefined) {
          a = a + +entrie.distance
        }
      }
      this.totalClaim = b.toFixed(2);
      this.totalMileageClaim = a.toFixed(2);
      if (this.allEntriesClaim.length !== 0) {
        this.fromDateClaim = this.allEntriesClaim[this.allEntriesClaim.length - 1].date;
        this.noOfEntriesClaim = this.allEntriesClaim.length;
      }
      else {
        this.fromDateClaim = '';
        this.noOfEntriesClaim = 0;
      }
    })
    this.allEntriesClaims = [];
    this.claimService.fetchClaims().then((claims: any) => {
      this.allEntriesClaims = claims
      let b: number = 0;
      let a: number = 0;
      for (let claim of this.allEntriesClaims) {
        for (let entrie of claim){
          b = b + ((entrie.price * 1) || (entrie.distance * 0.11))
          if (entrie.distance !== undefined) {
            a = a + +entrie.distance
          }
        }

      }
      this.totalClaims = b.toFixed(2);
      this.totalMileageClaims = a.toFixed(2);
      if (this.allEntriesClaims.length !== 0) {
        this.fromDateClaims = this.allEntriesClaims[this.allEntriesClaims.length - 1][this.allEntriesClaims[0].length - 1].date;
        this.noOfEntriesClaims = this.allEntriesClaims.length;
      }
      else {
        this.fromDateClaims = '';
        this.noOfEntriesClaims = 0;
      }
    })
  }

  openCurrentClaim() {
    this.navCtrl.push(CurrentClaimPage);
  }

  openPastClaims() {
    this.navCtrl.push(PastClaimsPage);
  }

  onOpenMenu() {
    this.menuCtrl.open();
  }

}
