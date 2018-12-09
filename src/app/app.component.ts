import { Component } from '@angular/core';

import { TabsPage } from '../pages/tabs/tabs';
import { ContactsProvider } from '../providers/contacts/contacts';
import { I18nProvider } from '../providers/i18n/i18n';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;

  constructor(
    contactsProv: ContactsProvider,
    i18n: I18nProvider,
  ) {
    i18n.init();
    contactsProv.init();
  }

}
