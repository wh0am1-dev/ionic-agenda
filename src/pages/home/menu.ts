import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="lang">
      <ion-list-header>
        <ion-icon name="globe" item-start></ion-icon>
        Language
      </ion-list-header>

      <ion-item>
        <ion-label>🇬🇧 English</ion-label>
        <ion-radio value="en"></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>🇪🇸 Spanish</ion-label>
        <ion-radio value="es"></ion-radio>
      </ion-item>
    </ion-list>
  `,
})
export class Menu {

  lang: string;

  constructor(public viewCtrl: ViewController) {
    this.lang = 'en';
  }

}
