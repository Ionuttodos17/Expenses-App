import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinkToBusinessPage } from './link-to-business';

@NgModule({
  declarations: [
    LinkToBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkToBusinessPage),
  ],
})
export class LinkToBusinessPageModule {}
