import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ContactsProvider {

  public static readonly DB_CONTACTS = 'contacts';
  private contacts: object = {
    a: [], b: [], c: [], d: [], e: [], f: [], g: [], h: [], i: [],
    j: [], k: [], l: [], m: [], n: [], o: [], p: [], q: [], r: [],
    s: [], t: [], u: [], v: [], w: [], x: [], y: [], z: [], _: [],
  };

  constructor(public storage: Storage) {
    this.storage.get(ContactsProvider.DB_CONTACTS).then(contacts => {
      if (contacts) this.contacts = contacts;
    });
  }

  getContacts() {
    let tmp = {};
    for (let k in this.contacts)
      tmp[k] = this.contacts[k];

    return tmp;
  }

  addContact(contact: Contact) {
    if (!this.contacts[contact.ini]) this.contacts[contact.ini] = [];

    this.contacts[contact.ini].push(contact);
    this.saveContacts();
  }

  editContact(oldContact: Contact, newContact: Contact) {
    this.removeContact(oldContact);
    this.addContact(newContact);
  }

  removeContact(contact: Contact) {
    let idx = this.findContact(contact);

    if (idx !== null) {
      this.contacts[contact.ini].splice(idx, 1);
      this.saveContacts();
    }
  }

  private saveContacts() {
    this.sortContacts();
    this.storage.set(ContactsProvider.DB_CONTACTS, this.contacts);
  }

  private findContact(contact: Contact): number {
    if (!this.contacts[contact.ini])
      return null;

    for (var i = 0; i < this.contacts[contact.ini].length; i++) {
      let c = this.contacts[contact.ini][i];

      if (contact.name.toLowerCase() === c.name.toLowerCase() &&
        contact.surname.toLowerCase() === c.surname.toLowerCase())
        return i;
    }

    return null;
  }

  private sortContacts() {
    for (let k in this.contacts) {
      this.contacts[k].sort((a, b) => {
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
      });
    }
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
