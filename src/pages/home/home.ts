import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TitleCasePipe } from '@angular/common';
import {
  NavController,
  AlertController,
  ToastController,
  ModalController,
  PopoverController,
  Refresher,
  Searchbar,
  Events,
} from 'ionic-angular';

import { Menu } from './menu';
import { DetailsPage } from '../details/details';
import { Contact, ContactsProvider } from '../../providers/contacts/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Searchbar) searchbar: Searchbar;

  trans = {
    searchContacts: '',
    editContact: '',
    newContact: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    cancel: '',
    done: '',
    contactEditError: '',
  };

  allContacts: Contact[] = [];
  contacts: Contact[] = [];

  constructor(
    public navCtrl: NavController,
    public contactsProv: ContactsProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public popCtrl: PopoverController,
    public events: Events,
    public translate: TranslateService,
    private titleCasePipe: TitleCasePipe,
  ) {
    this.loadTrans();

    this.events.subscribe('i18n:change', lang => {
      this.loadTrans();
    });

    this.events.subscribe('contacts:save', () => {
      this.refresh();
    });
  }

  ionViewWillEnter() {
    this.refresh();
  }

  popover(ev: any) {
    let pop = this.popCtrl.create(Menu);
    pop.present({ ev: ev });
  }

  initial(contacts, idx) {
    if (idx === 0 || contacts[idx - 1].ini !== contacts[idx].ini)
      return contacts[idx].ini;
    return null;
  }

  details(contact: Contact) {
    let modal = this.modalCtrl.create(DetailsPage, {
      contact: contact
    });
    modal.present();
  }

  call(contact: Contact) {
    // FIXME: use the line below, ref: https://bugs.chromium.org/p/chromium/issues/detail?id=792990
    // window.open(`tel:${contact.phone}`, '');
    window.location.href = `tel:${contact.phone}`;
  }

  mail(contact: Contact) {
    // FIXME: use the line below, ref: https://bugs.chromium.org/p/chromium/issues/detail?id=792990
    // window.open(`mailto:${contact.email}`, '');
    window.location.href = `mailto:${contact.email}`;
  }

  refresh(refresher?: Refresher) {
    this.searchbar.setValue('');
    this.contactsProv.getContacts().then(contacts => {
      this.allContacts = contacts;
      this.contacts = contacts.slice();

      if (refresher)
        setTimeout(() => {
          refresher.complete();
        }, 250);
    });
  }

  editor(contact?: Contact) {
    let alert = this.alertCtrl.create({
      title: contact ? this.trans.editContact : this.trans.newContact,
      enableBackdropDismiss: false,
      inputs: [{
        type: 'text',
        name: 'name',
        placeholder: this.trans.name,
        value: contact ? contact.name : '',
      }, {
        type: 'text',
        name: 'surname',
        placeholder: this.trans.surname,
        value: contact ? contact.surname : '',
      }, {
        type: 'text',
        name: 'phone',
        placeholder: this.trans.phone,
        value: contact ? contact.phone : '',
      }, {
        type: 'email',
        name: 'email',
        placeholder: this.trans.email,
        value: contact ? contact.email : '',
      }],
      buttons: [{
        text: this.trans.cancel,
        role: 'cancel',
        handler: data => true,
      }, {
        text: this.trans.done,
        handler: data => {
          if (data.name.trim() === '' || data.phone.trim() === '')
            this.toastCtrl.create({
              message: this.trans.contactEditError,
              showCloseButton: true,
              closeButtonText: 'X',
              duration: 3000,
            }).present();
          else if (contact)
            this.contactsProv.editContact(contact, new Contact(data.name, data.surname, data.phone, data.email));
          else
            this.contactsProv.addContact(new Contact(data.name, data.surname, data.phone, data.email));
        },
      }],
    });

    alert.present();
  }

  delete(contact: Contact) {
    this.contactsProv.removeContact(contact);
  }

  filter(ev?: any) {
    let query = ev ? ev.target.value : null;
    let contacts = this.allContacts.slice();

    if (query && query.trim() !== '') {
      let keywords = query.split(/(?:,| )+/);

      contacts = contacts.filter(contact => {
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

    this.contacts = contacts;
  }

  loadTrans() {
    this.translate.get('searchContacts').subscribe(str => {
      this.trans.searchContacts = this.titleCasePipe.transform(str);
    });

    this.translate.get('editContact').subscribe(str => {
      this.trans.editContact = this.titleCasePipe.transform(str);
    });

    this.translate.get('newContact').subscribe(str => {
      this.trans.newContact = this.titleCasePipe.transform(str);
    });

    this.translate.get('name').subscribe(str => {
      this.trans.name = this.titleCasePipe.transform(str);
    });

    this.translate.get('surname').subscribe(str => {
      this.trans.surname = this.titleCasePipe.transform(str);
    });

    this.translate.get('phone').subscribe(str => {
      this.trans.phone = this.titleCasePipe.transform(str);
    });

    this.translate.get('email').subscribe(str => {
      this.trans.email = this.titleCasePipe.transform(str);
    });

    this.translate.get('cancel').subscribe(str => {
      this.trans.cancel = this.titleCasePipe.transform(str);
    });

    this.translate.get('done').subscribe(str => {
      this.trans.done = this.titleCasePipe.transform(str);
    });

    this.translate.get('contactEditError').subscribe(str => {
      this.trans.contactEditError = str;
    });
  }

}
