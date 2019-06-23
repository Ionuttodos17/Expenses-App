import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccSettingsPage } from './acc-settings';

@NgModule({
  declarations: [
    AccSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccSettingsPage),
  ],
})
export class AccSettingsPageModule {}
