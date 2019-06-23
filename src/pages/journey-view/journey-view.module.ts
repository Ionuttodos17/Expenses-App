import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyViewPage } from './journey-view';

@NgModule({
  declarations: [
    JourneyViewPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyViewPage),
  ],
})
export class JourneyViewPageModule {}
