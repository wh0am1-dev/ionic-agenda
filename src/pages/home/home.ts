import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ContactsProvider } from '../../providers/contacts/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: object = {};

  constructor(
    public navCtrl: NavController,
    public contactsProv: ContactsProvider,
    ) {
    this.contacts = contactsProv.getContacts();
  }

  addContact() {
    console.log(':\')');
  }

  initials(): string[] {
    let ini = [];

    for (let k in this.contacts)
      ini.push(k);

    return ini;
  }

  filter(ev: any) {
    let query = ev.target.value;
    let keywords = query.split(/(?:,| )+/);
    let contacts = this.contactsProv.getContacts();

    if (query && query.trim() !== '') {
      for (let ini in contacts) {
        contacts[ini] = contacts[ini].filter(contact => {
          let stays = false;

          keywords.forEach(k => {
            stays = stays || contact.name.toLowerCase().indexOf(k.toLowerCase()) > -1;
            stays = stays || contact.surname.toLowerCase().indexOf(k.toLowerCase()) > -1;
            stays = stays || contact.phone.toLowerCase().indexOf(k.toLowerCase()) > -1;
            stays = stays || contact.email.toLowerCase().indexOf(k.toLowerCase()) > -1;
          });

          return stays;
        });
      }
    }

    this.contacts = contacts;
  }

}
