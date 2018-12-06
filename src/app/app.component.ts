import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { ContactsProvider } from '../providers/contacts/contacts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    storage: Storage,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    storage.get(ContactsProvider.DB_CONTACTS).then(contacts => {
      if (!contacts) storage.set(ContactsProvider.DB_CONTACTS, {
        a: [], b: [], c: [], d: [], e: [], f: [], g: [], h: [], i: [],
        j: [], k: [], l: [], m: [], n: [], o: [], p: [], q: [], r: [],
        s: [], t: [], u: [], v: [], w: [], x: [], y: [], z: [], _: [],
      })
    });
  }

}
