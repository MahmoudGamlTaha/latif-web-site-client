import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from './shared/services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  message;
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, private translate: TranslateService,private messagingService: MessagingService) {
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
    }else{
      localStorage.setItem('lang','en')
    }
  }
  
  ngOnInit(): void {

    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

}
