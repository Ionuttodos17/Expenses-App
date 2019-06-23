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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
var ExpenseFormPage = /** @class */ (function () {
    function ExpenseFormPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imageUrl = '';
        this.expenses = [];
        this.expenseType = ["Lunch", "Food", "Taxi", "Train", "Bus", "Other"];
    }
    ExpenseFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExpenseFormPage');
    };
    ExpenseFormPage.prototype.onGetPhoto = function () {
    };
    ExpenseFormPage.prototype.onSubmit = function (form) {
        this.description = form.value.description;
        this.price = form.value.price;
        this.type = form.value.expenseType;
        this.date = form.value.myDate;
        this.imageURL = "astring";
        this.expense = [form.value.description,
            form.value.price,
            form.value.expenseType,
            form.value.myDate,
            "astring"];
        this.expenses.push(this.expense);
        console.log(this.description, this.price, this.type, this.date.toString());
        console.log(this.expense);
        console.log(this.expenses);
    };
    ExpenseFormPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-expense-form',
            templateUrl: 'expense-form.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ExpenseFormPage);
    return ExpenseFormPage;
}());
export { ExpenseFormPage };
//# sourceMappingURL=expense-form.js.map