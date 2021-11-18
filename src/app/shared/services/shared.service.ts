import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sendFiles = new Subject()

  sendFireBaseTokenToLogin = new Subject()
  constructor() { }

}
