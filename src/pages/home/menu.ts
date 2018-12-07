import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { I18nProvider } from '../../providers/i18n/i18n';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="lang">
      <ion-list-header>
        <ion-icon name="globe" item-start></ion-icon>
        {{ 'language' | translate | titlecase }}
      </ion-list-header>

      <ion-item>
        <ion-label>🇬🇧 {{ 'english' | translate | titlecase }}</ion-label>
        <ion-radio value="en" (click)="changeLang()"></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>🇪🇸 {{ 'spanish' | translate | titlecase }}</ion-label>
        <ion-radio value="es" (click)="changeLang()"></ion-radio>
      </ion-item>
    </ion-list>
  `,
})
export class Menu {

  lang: string = 'en';

  constructor(
    public viewCtrl: ViewController,
    public i18n: I18nProvider,
  ) {
    this.i18n.get().then(lang => {
      this.lang = lang;
    });
  }

  changeLang() {
    this.i18n.set(this.lang);
  }

}
