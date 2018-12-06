import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ContactsProvider {

  private readonly DB_CONTACTS = 'contacts';
  private contacts: object = {};

  constructor(public storage: Storage) {
    storage.get(this.DB_CONTACTS).then(contacts => {
      if (!contacts) storage.set(this.DB_CONTACTS, this.contacts);
      else this.contacts = contacts;
    });
  }

  getContacts(): object {
    return this.contacts;
  }

  addContact(contact: Contact) {
    let ini = contact.name.charAt(0).toLowerCase();
    let idx = this.findContact(ini, contact);

    if (idx !== null) this.contacts[ini][idx] = contact;
    else this.contacts[ini].push(contact);

    this.saveContacts();
  }

  removeContact(contact: Contact) {
    let ini = contact.name.charAt(0).toLowerCase();
    let idx = this.findContact(ini, contact);

    if (idx !== null) {
      this.contacts[ini].splice(idx, 1);
      this.saveContacts();
    }
  }

  private saveContacts() {
    this.sortContacts();
    this.storage.set(this.DB_CONTACTS, this.contacts);
  }

  private findContact(ini: string, contact: Contact): number {
    for (var i = 0; i < this.contacts[ini].length; i++) {
      let c = this.contacts[ini][i];

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

class Contact {
  name: string;
  surname: string;
  phone: string;
  email: string;
}
