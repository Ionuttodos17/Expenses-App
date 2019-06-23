import {Injectable} from "@angular/core";
import {NavParams, Platform} from 'ionic-angular';
import {Base64} from '@ionic-native/base64';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


import {File} from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener';
import {Storage} from "@ionic/storage";
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
import {ResizerAndBase64} from "../resizeImgAndBase64/resizerAndBase64";

declare var cordova: any;


@Injectable()

export class PdfService {



  public claimDataForPDF: { date: any, from:any, to: any, description: any, miles: any, milesCost: any, mealsAccomCost: any, transport: any, other: any }[] = [];
  public totalsObj: { totalMiles: number, totalMilesCost: number, totalFoodAndAccomodation: number, totalTransport: number, totalOther: number, totalClaim: number };
  public claimReceived: any[] = [];
  public pdfObj = null;
  grandTotal: any;
  public settingsObj: { name: any, companyName: any, rate: number, regNumber: any, motExpDate: any, insExpDate: any };
  public pictures: string[] = [];
  public abase64Arr: string[];

  constructor(private plt: Platform,
              private file: File,
              private fileOpener: FileOpener,
              private storage: Storage,
              private base64: Base64,
              private imageResizer: ImageResizer,
              private base64Service: ResizerAndBase64,
              ) {
      this.storage.get('accSettings').then(value => {
      this.settingsObj = value;
 //     this.abase64Arr = this.base64Service.base64Arr
      });

  }

  public createPDFMaster(claim: any, index: any) {

    this.claimReceived = [];
    this.claimReceived = claim;
    this.claimDataForPDF = [];

    this.claimDataForPDF = this.createDataToWrite();
  //  this.base64Service.setBase64Arr(claim);
 //   this.abase64Arr = this.base64Service.base64Arr;
    this.calculateTotals();
    this.createPDF();
  }
/*
    public getBase64Arr(){

      this.base64Arr = [];
      for (let data of this.claimReceived){
        if (data.imageURL !== undefined || data.imageURL !== ''){
          //resize the image
          let options = {
            uri: data.imageURL,
            folderName: 'ProtonetIonut',
            quality: 60,
            width: 340,
            height: 480
          } as ImageResizerOptions;
          this.imageResizer
            .resize(options)
            .then((filePath: string) => {
              //get base64 of the image
              this.base64.encodeFile(filePath).then(value => {this.base64Arr.push(value.replace('*;charset=utf-8','jpg'))})
              //     console.log('FilePath', filePath)
            })
            .catch(e => console.log(e));
        }
      }
    return this.base64Arr
    }
*/
  public calculateTotals() {
    var totalMiles = 0;
    var totalMilesCost = 0;
    var totalFoodAndAccomodation = 0;
    var totalTransport = 0;
    var totalOther = 0;
    var totalClaim = 0;

    for (let theData of this.claimDataForPDF) {
      console.log('theData');
      console.log(theData);
      console.log(this.claimDataForPDF)
      if (theData.miles !== '') {
        totalMiles = totalMiles + (+theData.miles);
        totalMilesCost = totalMilesCost + (+theData.milesCost)
        console.log('calculate data after miles check');
        console.log(theData);
      }
      else {
        if (theData.mealsAccomCost !== '') {
          totalFoodAndAccomodation = totalFoodAndAccomodation + (+theData.mealsAccomCost);
          console.log('totalFoodAndAccomodation' + totalFoodAndAccomodation);
        }
        else {
          if (theData.transport !== '') {
            totalTransport = totalTransport + (+theData.transport);
            console.log('totalTransport' + totalTransport);
          }
          else {
            totalOther = totalOther + (+theData.other);
            console.log('totalOther');
          }
        }
      }
    }
    totalClaim = totalMilesCost + totalFoodAndAccomodation + totalTransport + totalOther;
    this.totalsObj = {totalMiles, totalMilesCost, totalFoodAndAccomodation, totalTransport, totalOther, totalClaim};
    return this.totalsObj;
  }


  public calculateGrandTotal() {
    var totalFromMiles = 0;
    var totalFromReceipts = 0;
    for (let data of this.claimReceived) {
      console.log("calculate totals meth")
      console.log(this.claimReceived);
      console.log(data);
      if (data.to !== undefined) {
        totalFromMiles = totalFromMiles + (+data.distance) * 0.11
      }
      else {
        totalFromReceipts = totalFromReceipts + (+data.price)
      }
    }
    return (totalFromReceipts + totalFromMiles).toFixed(2);
  }

  public createDataToWrite() {

    this.claimDataForPDF = [];
    this.pictures = [];
    this.abase64Arr = [];

    var anObj: { date: any, from:any, to: any,  description: any, miles: any, milesCost: any, mealsAccomCost: string, transport: string, other: string }
    for (let data of this.claimReceived) {
      if (data.to !== undefined) {
        var date: Date = data.date;
        var from:any = data.from;
        var to: any = data.to;
        var description: any = data.description;
        var miles: any = data.distance;
        var mealsAccomCost: any = '';
        var transport: any = '';
        var other: any = '';
        var milesCost: any = ((data.distance) * 0.11).toFixed(2);
        anObj = {date, to, from, description, miles, milesCost, mealsAccomCost, transport, other};
        this.claimDataForPDF.push(anObj);
      }
      else {
        if (data.imageURL !== undefined || data.imageURL !== ''){
          this.pictures.push(data.imageURL);
          this.abase64Arr.push(data.base64Str)
/*
          let options = {
            uri: data.imageURL,
            folderName: 'ProtonetIonut',
            quality: 60,
            width: 340,
            height: 480
          } as ImageResizerOptions;
          this.imageResizer
            .resize(options)
            .then((filePath: string) => {
              this.base64.encodeFile(filePath).then(value => {this.base64Arr.push(value.replace('*;charset=utf-8','jpg'))})
         //     console.log('FilePath', filePath)
        })
            .catch(e => console.log(e));
*/
        }
        var date: Date = data.date;
        var to: any = '';
        var from:any = '';
        var description: any = data.description;
        var miles: any = '';
        var milesCost: any = '';
        if (data.type == 'Meal' || data.type == 'Accomodation') {
          var mealsAccomCost: any = data.price;
          var transport: any = '';
          var other: any = '';
        }
        else if (data.type == 'Taxi' || data.type == 'Bus' || data.type == 'Train' || data.type == 'Other Transport') {
          var mealsAccomCost: any = '';
          var transport: any = data.price;
          var other: any = ''
        }
        else {
          var mealsAccomCost: any = '';
          var transport: any = '';
          var other: any = data.price
        }
        anObj = {date, from, to, description, miles, milesCost, mealsAccomCost, transport, other};
        this.claimDataForPDF.push(anObj);
      }
    }

    return this.claimDataForPDF;
  }

  public createBase64(){
    var base64Pic:string;
  //  this.base64.encodeFile(this.pictures[1]).then(data=>{base64Pic = data.toString()})
    this.convertToBase64(this.pictures[1],'').then(value => {base64Pic = value.toString(); return base64Pic})
  //  return base64Pic
  }

  convertToBase64(url, outputFormat) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        canvas = null;
        resolve(dataURL);
      };
      img.src = url;
    });
  }

  printImagesLocations(){
    var printableText=[];
    for (let data of this.pictures){
      printableText.push({text:data},)
    }
    return printableText;
  }

  printImages(){
    var printableImg = [];
    for (let data of this.abase64Arr){
      printableImg.push({image:data,
      //  height:140, width:105
      },)
    }
    return printableImg;
  }

  public createTabelePicturesHTML(){
    var somePrintable1 = [];
    var headerTable = [{border: [false, false, false, false], text:''},
      {border: [false, false, false, false], text:''},
      {border: [false, false, false, false], text:''},
      {border: [false, false, false, false], text:''}];
    somePrintable1.push(headerTable);
    var rowDynamicTable = [];
    var rowDynamic2=[];

/*
    rowDynamic2.push({border: [true, true, true, true], image:this.abase64Arr[0]},
      {border: [true, true, true, true], image:this.abase64Arr[0]},
      {border: [true, true, true, true], image:this.abase64Arr[0]},
      {border: [true, true, true, true], image:this.abase64Arr[0]})
    somePrintable1.push(rowDynamic2);
*/
    for (let i=1; i<=this.abase64Arr.length;i++){
      rowDynamic2.push({border: [false, false, false, false], image:this.abase64Arr[i-1]});
      if (i%4===0){
        somePrintable1.push(rowDynamic2)
        rowDynamic2 = [];
      }
    else{
        if (i%4===1 && this.abase64Arr.length==i){
          rowDynamic2.push({border: [false, false, false, false], text:''});
          rowDynamic2.push({border: [false, false, false, false], text:''});
          rowDynamic2.push({border: [false, false, false, false], text:''});
          somePrintable1.push(rowDynamic2);
 //       somePrintable1.push(rowDynamic2, {border: [true, true, true, true], text:''},{border: [true, true, true, true], text:''},{border: [true, true, true, true], text:''})
          rowDynamic2 = [];
        }
        else{
          if(i%4===2 && this.abase64Arr.length==i){
            rowDynamic2.push({border: [false, false, false, false], text:''});
            rowDynamic2.push({border: [false, false, false, false], text:''});
            somePrintable1.push(rowDynamic2);
            rowDynamic2 = [];
          }
          else{
            if(i%4===3 && this.abase64Arr.length==i){
              rowDynamic2.push({border: [false, false, false, false], text:''});
              rowDynamic2.push({border: [false, false, false, false], text:''});
              somePrintable1.push(rowDynamic2);
              rowDynamic2 = [];
            }
          }
        }
      }


    }

    return {style: 'tableStyle', table: {headerRows: 1, body: somePrintable1}};
  }

  public formatDataTableHTML() {
    var somePrintable = [];
    var firstRowHeader = [{border: [false, false, false, false], text: '', colSpan: 5}, {}, {},{}, {}, {border: [false, false, false, false],
      text: 'Cost',
      colSpan: 4,
      style: 'tableStyleHeader',
      alignment: 'center'
    }, {}, {}, {}];
    var header = [
      {text: 'DATE', style: 'tableStyleHeader'},
      {text: 'FROM', style: 'tableStyleHeader'},
      {text: 'TO', style: 'tableStyleHeader'},
      {text: 'DESCRIPTION', style: 'tableStyleHeader'},
      {text: 'MILES', style: 'tableStyleHeader'},
      {text: 'MileageCOST', style: 'tableStyle'},
      {text: 'Food/Accomodation', style: 'tableStyle'},
      {text: 'Transport', style: 'tableStyle'},
      {text: 'Other', style: 'tableStyle'}];
    var footerTable1 = [
      {border: [false, false, false, false],text:''},
      {border: [false, false, false, false],text:''},
      {border: [false, false, false, false],text:''},
      {text: 'Total Category'},
      {text: this.totalsObj.totalMiles.toFixed(2)},
      {text: this.totalsObj.totalMilesCost.toFixed(2)},
      {text: this.totalsObj.totalFoodAndAccomodation.toFixed(2)},
      {text: this.totalsObj.totalTransport.toFixed(2)},
      {text: this.totalsObj.totalOther.toFixed(2)}];
    var footerTableLast = [
      {border: [false, false, false, false],text:''},
      {border: [false, false, false, false],text:''},
      {border: [false, false, false, false],text:''},
      {border: [false, false, false, false],text: "Total Claim:", colSpan: 2, bold: true, size: 28}, {},
      {border: [false, false, false, false],text: this.totalsObj.totalClaim.toFixed(2), colSpan: 4,bold: true,size: 18}, {}, {}, {}];
    somePrintable.push(firstRowHeader);
    somePrintable.push(header);
    for (let data of this.claimDataForPDF) {
      somePrintable.push([data.date + '',data.from +'', data.to + '', data.description + '', data.miles + '', (+data.miles * 0.11).toFixed(2), data.mealsAccomCost + '', data.transport + '', data.other + ''])
    }
    somePrintable.push(footerTable1);
    somePrintable.push(footerTableLast);
    return {style: 'tableStyle', table: {headerRows: 2, body: somePrintable},pageBreak: 'after'};
  }

  public createPDF() {



    var docDefinition = {
      content: [
        {text: 'EXEPENSES CLAIM FORM ', style: 'header'},
        {text: this.settingsObj.companyName, style:'header'},
        {text: this.settingsObj.name, style:'header'},
        {text:'Date From: '+this.claimReceived[0].date},
        {text:'Date To: '+this.claimReceived[this.claimReceived.length-1].date},
        this.formatDataTableHTML(),

        this.createTabelePicturesHTML(),
//        this.printImagesLocations(),
//        {text: this.createBase64()},
//        this.abase64Arr.length,
//        this.printImages(),

      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        tableStyle: {
          fontSize: 8,
          fontcolor: "green"
        },
        tableStyleHeader: {
          bold: true,
          italic: true,
          fontSize: 10
        }
      },
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], {type: 'application/pdf'});
        var fileName = //this.externalDataRetrievedFromServer.length
          'pdfFile1' + '.PDF';
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, fileName, blob, {replace: true}).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }


}
