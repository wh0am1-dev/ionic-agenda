import { Injectable } from '@angular/core';
import { ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ContactsProvider {

  public static readonly DB_CONTACTS = 'contacts';

  trans = {
    contactAdded: '',
    contactEdited: '',
    contactRemoved: '',
  };

  constructor(
    public storage: Storage,
    public events: Events,
    public toastCtrl: ToastController,
    public translate: TranslateService,
  ) {
    this.loadTrans();

    events.subscribe('i18n:change', lang => {
      this.loadTrans();
    });
  }

  init() {
    this.getContacts().then(contacts => {
      if (!contacts) this.storage.set(ContactsProvider.DB_CONTACTS, []);
    });
  }

  getContacts(): Promise<Contact[]> {
    return this.storage.get(ContactsProvider.DB_CONTACTS);
  }

  addContact(contact: Contact) {
    this.getContacts().then(contacts => {
      contacts.push(contact);
      this.saveContacts(contacts);

      this.toastCtrl.create({
        message: this.trans.contactAdded,
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 3000,
      }).present();
    });
  }

  editContact(oldContact: Contact, newContact: Contact) {
    this.getContacts().then(contacts => {
      let idx = this.findContact(contacts, oldContact);
      contacts[idx] = newContact;
      this.saveContacts(contacts);

      this.toastCtrl.create({
        message: this.trans.contactEdited,
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 3000,
      }).present();
    });
  }

  removeContact(contact: Contact) {
    this.getContacts().then(contacts => {
      let idx = this.findContact(contacts, contact);
      contacts.splice(idx, 1);
      this.saveContacts(contacts);

      this.toastCtrl.create({
        message: this.trans.contactRemoved,
        showCloseButton: true,
        closeButtonText: 'X',
        duration: 3000,
      }).present();
    });
  }

  private findContact(contacts: Contact[], contact: Contact): number {
    for (var i = 0; i < contacts.length; i++) {
      let c = contacts[i];

      if (contact.name.toLowerCase() === c.name.toLowerCase() &&
        contact.surname.toLowerCase() === c.surname.toLowerCase())
        return i;
    }

    return null;
  }

  private saveContacts(contacts) {
    contacts.sort(this.sortContacts);
    this.storage.set(ContactsProvider.DB_CONTACTS, contacts).then(() => {
      this.events.publish('contacts:save');
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

  loadTrans() {
    this.translate.get('contactAdded').subscribe(str => {
      this.trans.contactAdded = str;
    });

    this.translate.get('contactEdited').subscribe(str => {
      this.trans.contactEdited = str;
    });

    this.translate.get('contactRemoved').subscribe(str => {
      this.trans.contactRemoved = str;
    });
  }

}

export class Contact {

  private static readonly ABC = 'abcdefghijklmnopqrstuvwxyz';

  name: string;
  surname: string;
  phone: string;
  email: string;
  ini: string;
  color: string;

  constructor(name: string, surname: string, phone: string, email: string) {
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.color = this.rndColor();

    let tmp = this.name.charAt(0).toLowerCase();
    if (Contact.ABC.indexOf(tmp) > -1)
      this.ini = tmp;
    else
      this.ini = '_';

  }

  rndColor(): string {
    let colors = [
      '#eb4e32',
      '#ffd954',
      '#83bd75',
      '#2e76c3',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

}
