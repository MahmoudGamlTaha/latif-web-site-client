import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging,private SharedService:SharedService) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        
        this.SharedService.sendFireBaseTokenToLogin.next(token)
      },
      (err) => {
        
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        
        this.currentMessage.next(payload);
      })
  }
}