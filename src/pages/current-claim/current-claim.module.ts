import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentClaimPage } from './current-claim';

@NgModule({
  declarations: [
    CurrentClaimPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentClaimPage),
  ],
})
export class CurrentClaimPageModule {}
