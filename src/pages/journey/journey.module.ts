import {NgModule} from '@angular/core';
import {JourneyPage} from './journey';
import {IonicPageModule} from 'ionic-angular';


@NgModule({
  declarations: [JourneyPage],
  imports: [IonicPageModule.forChild(JourneyPage)],
  entryComponents: [JourneyPage]
})
export class JourneyPageModule {
}
