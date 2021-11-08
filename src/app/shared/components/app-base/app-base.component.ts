import { Component, Injector, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-base',
  template: '',
})
export class AppBaseComponent implements OnDestroy{

  unsubscribe: Subscription[] = [];

  constructor(injector: Injector) { }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
