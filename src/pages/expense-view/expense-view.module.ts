import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseViewPage } from './expense-view';

@NgModule({
  declarations: [
    ExpenseViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseViewPage),
  ],
})
export class ExpenseViewPageModule {}
