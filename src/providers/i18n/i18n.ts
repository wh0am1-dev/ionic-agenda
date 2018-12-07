import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class I18nProvider {

  public static readonly DB_LANG = 'lang';

  constructor(
    public storage: Storage,
    public events: Events,
    public translate: TranslateService,
  ) {}

  init() {
    this.translate.setDefaultLang('en');
    this.get().then(lang => {
      if (!lang)
        this.storage.set(I18nProvider.DB_LANG, 'en');
      else {
        this.translate.use(lang);
        this.events.publish('i18n:change', lang);
      }
    });
  }

  get(): Promise<string> {
    return this.storage.get(I18nProvider.DB_LANG);
  }

  set(lang: string) {
    this.translate.use(lang);
    this.storage.set(I18nProvider.DB_LANG, lang).then(() => {
      this.events.publish('i18n:change', lang);
    });
  }

}
