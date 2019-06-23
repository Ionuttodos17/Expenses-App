import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClaimViewPage } from './claim-view';

@NgModule({
  declarations: [
    ClaimViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ClaimViewPage),
  ],
})
export class ClaimViewPageModule {}
