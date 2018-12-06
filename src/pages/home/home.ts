import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Refresher, Searchbar, Events } from 'ionic-angular';

import { Contact, ContactsProvider } from '../../providers/contacts/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Searchbar) searchbar: Searchbar;

  allContacts: object = {};
  contacts: object = {};

  constructor(
    public navCtrl: NavController,
    public contactsProv: ContactsProvider,
    public alertCtrl: AlertController,
    public events: Events,
  ) {
    this.events.subscribe('contacts:saved', () => {
      this.refresh();
    });
  }

  ionViewWillEnter() {
    this.refresh();
  }

  call(contact: Contact) {
    // TODO
  }

  mail(contact: Contact) {
    // TODO
  }

  initials(): string[] {
    let ini = [];
    for (let k in this.contacts)
      ini.push(k);

    return ini;
  }

  refresh(refresher?: Refresher) {
    this.searchbar.setValue('');
    this.contactsProv.getContacts().then(contacts => {
      this.allContacts = contacts;

      this.contacts = {};
      for (let k in this.allContacts)
        this.contacts[k] = this.allContacts[k].slice();

      if (refresher)
        setTimeout(() => {
          refresher.complete();
        }, 250);
    });
  }

  editor(contact?: Contact) {
    let alert = this.alertCtrl.create({
      title: contact ? 'Edit Contact' : 'New Contact',
      enableBackdropDismiss: false,
      inputs: [{
        type: 'text',
        name: 'name',
        placeholder: 'Name',
        value: contact ? contact.name : '',
      }, {
        type: 'text',
        name: 'surname',
        placeholder: 'Surname',
        value: contact ? contact.surname : '',
      }, {
        type: 'text',
        name: 'phone',
        placeholder: 'Phone',
        value: contact ? contact.phone : '',
      }, {
        type: 'text',
        name: 'email',
        placeholder: 'Email',
        value: contact ? contact.email : '',
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => true,
      }, {
        text: 'Done',
        handler: data => {
          if (contact)
            this.contactsProv.editContact(contact, new Contact(data.name, data.surname, data.phone, data.email), this.refresh);
          else
            this.contactsProv.addContact(new Contact(data.name, data.surname, data.phone, data.email), this.refresh);
        },
      }],
    });

    alert.present();
  }

  delete(contact: Contact) {
    this.contactsProv.removeContact(contact, this.refresh);
  }

  filter(ev?: any) {
    let query = ev ? ev.target.value : null;

    let contacts = {};
    for (let k in this.allContacts)
      contacts[k] = this.allContacts[k].slice();

    if (query && query.trim() !== '') {
      let keywords = query.split(/(?:,| )+/);

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
