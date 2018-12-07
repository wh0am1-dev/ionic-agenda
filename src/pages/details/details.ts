import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Contact } from '../../providers/contacts/contacts';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  contact: Contact;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.contact = this.navParams.get('contact');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
