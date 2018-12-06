import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ContactsProvider {

  private readonly DB_CONTACTS = 'contacts';
  private contacts: Array<Contact> = [];

  constructor(public storage: Storage) {
    storage.get(this.DB_CONTACTS).then(contacts => {
      if (!contacts) storage.set(this.DB_CONTACTS, this.contacts);
      else this.contacts = contacts;
    });
  }

  getContacts(): Array<Contact> {
    return this.contacts;
  }

  addContact(contact: Contact) {
    let idx = this.findContact(contact);

    if (idx !== null) this.contacts[idx] = contact;
    else this.contacts.push(contact);

    this.saveContacts();
  }

  removeContact(contact: Contact) {
    let idx = this.findContact(contact);

    if (idx !== null) {
      this.contacts.splice(idx, 1);
      this.saveContacts();
    }
  }

  private saveContacts() {
    this.sortContacts();
    this.storage.set(this.DB_CONTACTS, this.contacts);
  }

  private findContact(contact: Contact): number {
    for (var i = 0; i < this.contacts.length; i++) {
      let c = this.contacts[i];

      if (contact.name === c.name && contact.surname === c.surname)
        return i;
    }

    return null;
  }

  private sortContacts() {
    this.contacts.sort((a, b) => {
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

class Contact {
  name: string;
  surname: string;
  phone: string;
  email: string;
}
