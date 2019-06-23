var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { JourneyPage } from "../journey/journey";
import { PopoverController } from 'ionic-angular';
import { Popover1Page } from "../popover1/popover1";
import { ExpenseFormPage } from "../expense-form/expense-form";
var CurrentClaimPage = /** @class */ (function () {
    function CurrentClaimPage(navCtrl, navParams, menuCtrl, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.popoverCtrl = popoverCtrl;
        this.addJourney = JourneyPage;
    }
    CurrentClaimPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CurrentClaimPage');
    };
    CurrentClaimPage.prototype.onOpenMenu = function () {
        this.menuCtrl.open();
    };
    CurrentClaimPage.prototype.onLoadNewJourney = function () {
        this.navCtrl.push(JourneyPage);
    };
    CurrentClaimPage.prototype.onLoadNewExpense = function () {
        this.navCtrl.push(ExpenseFormPage);
    };
    CurrentClaimPage.prototype.presentPopover = function (myEvent) {
        var popover;
        popover = this.popoverCtrl.create(Popover1Page);
        popover.present({
            ev: myEvent
        });
    };
    CurrentClaimPage.prototype.presentPopover1 = function () {
        var popover;
        popover = this.popoverCtrl.create(Popover1Page);
        popover.present();
    };
    CurrentClaimPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-current-claim',
            templateUrl: 'current-claim.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            MenuController,
            PopoverController])
    ], CurrentClaimPage);
    return CurrentClaimPage;
}());
export { CurrentClaimPage };
//# sourceMappingURL=current-claim.js.map
