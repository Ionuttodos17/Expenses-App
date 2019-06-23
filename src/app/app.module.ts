import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgProgress } from "@ngx-progressbar/core";
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Base64 } from '@ionic-native/base64';

import { MyApp } from './app.component';
import {HomePage} from "../pages/home/home";
import {AboutPage} from "../pages/about/about";
import {AccSettingsPage} from "../pages/acc-settings/acc-settings";

import {CurrentClaimPage} from "../pages/current-claim/current-claim";
import {LinkToBusinessPage} from "../pages/link-to-business/link-to-business";
import {PastClaimsPage} from "../pages/past-claims/past-claims";
import {JourneyPage} from "../pages/journey/journey";
import {Popover1Page} from "../pages/popover1/popover1";
import {ExpenseFormPage} from "../pages/expense-form/expense-form";
import {JourneyService} from "../providers/journeyService/journeyService";
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';



import {AllData} from "../providers/allData/allData";
import {ClaimService} from "../providers/claim/claimService";
import {ClaimViewPage} from "../pages/claim-view/claim-view";
import {JourneyViewPage} from "../pages/journey-view/journey-view";
import {ExpenseViewPage} from "../pages/expense-view/expense-view";
import {PdfService} from "../providers/pdfService/pdfService";
import {ResizerAndBase64} from "../providers/resizeImgAndBase64/resizerAndBase64";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    AccSettingsPage,
    CurrentClaimPage,
    LinkToBusinessPage,
    PastClaimsPage,
    JourneyPage,
    Popover1Page,
    ExpenseFormPage,
    ClaimViewPage,
    JourneyViewPage,
    ExpenseViewPage,


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    AccSettingsPage,
    CurrentClaimPage,
    LinkToBusinessPage,
    PastClaimsPage,
    JourneyPage,
    Popover1Page,
    ExpenseFormPage,
    ClaimViewPage,
    JourneyViewPage,
    ExpenseViewPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JourneyService,
    Camera,
    ClaimService,
    AllData,
    NgProgress,
    ClaimViewPage,
    PdfService,
    File,
    FileOpener,
    Base64,
    ImageResizer,
    ResizerAndBase64,



  ]
})
export class AppModule {}
