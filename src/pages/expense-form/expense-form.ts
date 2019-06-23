import { Component } from '@angular/core';
import {DateTime, IonicPage, NavController, NavParams, ActionSheetController,ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Camera, PictureSourceType} from "@ionic-native/camera";
//import {NgProgress} from "@ngx-progressbar/core";
import * as Tesseract from 'tesseract.js';
import {Entry, File, FileError } from "@ionic-native/file";

import {runInThisContext} from "vm";
import {AllData} from "../../providers/allData/allData";
//import {Expenses} from "../../providers/expenses/expenses";
//import {Expense} from "../../models/expense";
import { ImageResizer, ImageResizerOptions} from "@ionic-native/image-resizer";
import {Base64} from "@ionic-native/base64";

declare var cordova: any;

//@IonicPage()
@Component({
  selector: 'page-expense-form',
  templateUrl: 'expense-form.html',
})
export class ExpenseFormPage {
  selectedimage: string;
  public imageText: string;
  imageUrl = '';
  base64Str = '';
  file: File;
//  private expenses: Expense[]=[];
  selected: string;
  expenseType: Array<string> = ["Meal","Accomodation", "Taxi", "Train", "Bus","Other Transport","Other"];
//  public expense: Expense;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private imageResizer: ImageResizer,
            //  public progress: NgProgress,
              private toastCtrl: ToastController,
           //   private expensesService: Expenses,
              private allData : AllData,
              private base64: Base64,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseFormPage');
  }
  public onGetPhoto(){

    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Take Photo',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();

  }
/*
  onTakePhoto(sourceType: PictureSourceType) {

    this.camera.getPicture()
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          cordova.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl = data.nativeURL;
                this.camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: 'Could not save the image. Please try again',
                  duration: 2500
                });
                toast.present();
                this.camera.cleanup();
              }
            );
          this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: 'Could not take the image. Please try again',
            duration: 2500
          });
          toast.present();
        }
      );
  }
*/
  public getPicture(sourceType: PictureSourceType){

    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true})
      .then(imageData => {
      this.imageUrl = imageData;

      //beginning of resizer
        let options = {
          uri: imageData,
          folderName: 'ProtonetIonut',
          quality: 90,
          width: 105,
          height: 140
        } as ImageResizerOptions;
        this.imageResizer
          .resize(options)
          .then((filePath: string) => {
            //get base64 of the image
            this.base64
              .encodeFile(filePath)
              .then((value:string) => {
                this.base64Str = (value.replace('*;charset=utf-8', 'jpg'))
              })
          })
      })
      .catch(err => {
      const toast = this.toastCtrl.create({
        message: 'Could not take the image. Please try again',
        duration: 2500
      });
      toast.present();
    })
    ;
    // this.recogniseImage();
  }


  public recogniseImage(){
    const toast = this.toastCtrl.create({
      message: "you are here",
      duration: 2500
    });
    toast.present();
    Tesseract.recognize(this.imageUrl,)
      .progress(message => {
        if (message.status === 'recognizing text') {
         // this.progress.set(message.progress);
        }
        const toast = this.toastCtrl.create({
          message: "progress",
          duration: 2500
        });
        toast.present();
      })
      .catch(err => {
          const toast = this.toastCtrl.create({
            message: 'err: '+err,
            duration: 2500
          });
          toast.present();
        }
        //   console.error(err)
      )
      .then(result => {
        this.imageText = result.text;
        const toast = this.toastCtrl.create({
          message: this.imageText,
          duration: 2500
        });
        toast.present();
      })

      .finally(resultOrError => {
     //   this.progress.complete();
      });

  }

  public onSubmit(form: NgForm){
 //   this.expensesService.addExpense(form.value.description,form.value.price,form.value.expenseType,form.value.myDate,this.imageUrl);
    if (this.imageUrl == ''){
      const toast = this.toastCtrl.create({
        message: "please add an image",
        duration: 2500
      });
      toast.present();
    }
    else{
      const description = form.value.description;
      const price = form.value.price;
      const type = form.value.expenseType;
      const date = form.value.myDate;
      const imageURL = this.imageUrl;
      const base64Str = this.base64Str;
      const entrie :{description: any, price: number, type: any, date: Date, imageURL: string, base64Str: string}=
        {description, price, type, date, imageURL, base64Str}
      this.allData.addEntrie(entrie);
      form.reset();
      this.navCtrl.pop();
    }

  }


}


