import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, private translate: TranslateService) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
    }

    if(localStorage.getItem('lang')){
      let lang = localStorage.getItem('lang')
      this.translate.use(lang)
      if(lang === 'ar'){
        document.body.classList.remove('ltr')
        document.body.classList.add('rtl')
      }else if(lang === 'en'){
        document.body.classList.remove('rtl')
        document.body.classList.add('ltr')
      }
    }
  }
  

}
