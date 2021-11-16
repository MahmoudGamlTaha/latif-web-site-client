import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-app-base',
  template: '',
})
export class AppBaseComponent implements OnDestroy{

  unsubscribe: Subscription[] = [];

  refresh = new Subject();

  constructor(injector: Injector) { }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
