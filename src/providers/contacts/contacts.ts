import { Injectable } from '@angular/core';
import { ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class ContactsProvider {

  public static readonly DB_CONTACTS = 'contacts';

  constructor(
    public storage: Storage,
    public events: Events,
    public toastCtrl: ToastController,
  ) {}

  getContacts(): Promise<object> {
    return this.storage.get(ContactsProvider.DB_CONTACTS);
  }

  addContact(contact: Contact) {
    this.getContacts().then(contacts => {
      contacts[contact.ini].push(contact);
      this.saveContacts(contacts);

      this.toastCtrl.create({
        message: 'Contact added ! :)',
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 3000,
      }).present();
    });
  }

  editContact(oldContact: Contact, newContact: Contact) {
    this.getContacts().then(contacts => {
      let idx = this.findContact(contacts, oldContact);
      contacts[oldContact.ini].splice(idx, 1);
      contacts[newContact.ini].push(newContact);
      this.saveContacts(contacts);

      this.toastCtrl.create({
        message: 'Contact edited ! :)',
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 3000,
      }).present();
    });
  }

  removeContact(contact: Contact) {
    this.getContacts().then(contacts => {
      let idx = this.findContact(contacts, contact);
      contacts[contact.ini].splice(idx, 1);
      this.saveContacts(contacts);

      this.toastCtrl.create({
        message: 'Contact removed ! :(',
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 3000,
      }).present();
    });
  }

  private findContact(contacts: object, contact: Contact): number {
    if (!contacts[contact.ini])
      return null;

    for (var i = 0; i < contacts[contact.ini].length; i++) {
      let c = contacts[contact.ini][i];

      if (contact.name.toLowerCase() === c.name.toLowerCase() &&
        contact.surname.toLowerCase() === c.surname.toLowerCase())
        return i;
    }

    return null;
  }

  private saveContacts(contacts) {
    for (let k in contacts)
      contacts[k].sort(this.sortContacts);

    this.storage.set(ContactsProvider.DB_CONTACTS, contacts).then(() => {
      this.events.publish('contacts:saved');
    });
  }

  private sortContacts(a, b) {
    let aName = a.name.toLowerCase();
    let bName = b.name.toLowerCase();
    let aSurname = a.surname.toLowerCase();
    let bSurname = b.surname.toLowerCase();

    if (aName === bName) {
      if (aSurname < bSurname) return -1;
      if (aSurname > bSurname) return 1;
      return 0;
    }

    if (aName < bName) return -1;
    return 1;
  }
}

export class Contact {

  private static readonly ABC = 'abcdefghijklmnopqrstuvwxyz';

  name: string;
  surname: string;
  phone: string;
  email: string;
  ini: string;

  constructor(name: string, surname: string, phone: string, email: string) {
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;

    let tmp = this.name.charAt(0).toLowerCase();
    if (Contact.ABC.indexOf(tmp) > -1)
      this.ini = tmp;
    else
      this.ini = '_';
  }

}
