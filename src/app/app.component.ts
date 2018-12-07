import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ContactsProvider } from '../providers/contacts/contacts';
import { I18nProvider } from '../providers/i18n/i18n';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    contactsProv: ContactsProvider,
    i18n: I18nProvider,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
  ) {
    i18n.init();
    contactsProv.init();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
