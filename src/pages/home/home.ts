import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ContactsProvider } from '../../providers/contacts/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public contactsProv: ContactsProvider,
  ) {}

  addContact() {
    console.log(':\')');
  }

}
