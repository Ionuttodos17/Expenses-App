import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastClaimsPage } from './past-claims';

@NgModule({
  declarations: [
    PastClaimsPage,
  ],
  imports: [
    IonicPageModule.forChild(PastClaimsPage),
  ],
})
export class PastClaimsPageModule {}
