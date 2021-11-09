import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageRequest, ProfileService } from '../../../shared/services/profile.service';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { AppBaseComponent } from '../../../shared/components/app-base/app-base.component';
import { CookiesData } from '../../../shared/services/cookies/CookiesData.service';
import { NgForm } from '@angular/forms';
import { UserAdsService } from '../../../shared/services/product.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  extends AppBaseComponent implements OnInit, OnDestroy {

  userProfile;
  public grid: string = 'col-md-6';
  public layoutView: string = 'grid-view';
  public all_products: any[] = [];
  public products: any[] = [];
  pageSize = 2
  page = 0
  start = 0;
  public finished: boolean = false  // boolean when end of data is reached


  chatMessagesData = [];
  chatData: [];

  chatSubmit: boolean;
  userNameChat:string;
  selectedUser;

  @ViewChild('chatPS') chatPS: PerfectScrollbarComponent;
  constructor(
    injector: Injector,
    public ProfileService: ProfileService,
    private cookie: CookiesData,
    public productService:UserAdsService,
    private route: ActivatedRoute, 
    private router: Router,
    private viewScroller: ViewportScroller
    ) {
      super(injector);

  }

  ngOnInit(): void {
    if (this.cookie.checkUserProfile) this.userProfile = JSON.parse(this.cookie.getUserProfile())
    console.log(' this.userProfile: ', this.userProfile);

  
  }

  // get my ads

  myAds(){
   const getSub =  this.ProfileService.myAds(String(this.page), String(this.pageSize)).subscribe(result => {
      this.all_products = result.response.data 
      this.addItems(this.start, this.pageSize);  
    })
    this.unsubscribe.push(getSub)
  }

  myChat(){
    const getSub =  this.ProfileService.myChat(String(this.page)).subscribe(result => {
       this.chatData = result.response.data 
       console.log('  this.chatData: ',   this.chatData);
     })
     this.unsubscribe.push(getSub)
   }
   
   nextPageById(message_id,room){
     this.chatMessagesData = [];
    const getSub =  this.ProfileService.nextPageById(message_id,room).subscribe(result => {
       this.chatMessagesData = result.response.data.slice().reverse()
       this.chatPS.directiveRef.scrollToBottom(0, 300)
     })
     this.unsubscribe.push(getSub)
   }
   

   
  addItems(index, sum) {  
    if(this.products.length < this.all_products.length){
      this.finished = true;
      for (let i = index; i < sum; ++i) {  
        this.products = this.all_products
      }  
    }
  
  }
  
  onScroll(){
    this.start = this.pageSize;  
    this.pageSize += 2;  
    this.myAds();  
  }

  onChangeTabe(v){
    if(v.nextId === 'ngb-tab-1'){
      this.myAds()
    }else if(v.nextId === 'ngb-tab-2'){
      this.myChat()
    }
  }

  messageSave(f:NgForm){
    
    const body :any ={
      ad_item: this.selectedUser?.itemId,
      device_id: 'web',
      device_model: 'web',
      message: f.value.message,
      room:  this.selectedUser?.room,
      sender:  this.selectedUser?.senderId,
    }
    this.ProfileService.sndMsg(body).subscribe(res =>{
      body['senderId'] = this.selectedUser?.senderId
      this.chatMessagesData.push(body)
      console.log(' this.chatMessagesData: ',  this.chatMessagesData);
      f.reset()
      this.chatPS.directiveRef.scrollToBottom(0)
      this.chatPS.directiveRef.scrollToBottom(0)
      this.chatPS.directiveRef.scrollToBottom(0)
    })
  }

  chatUsername(data,f) {
    console.log('data: ', data);
    this.selectedUser = data
    this.userNameChat = data.reciverName
    this.nextPageById(null, data.room)
    f.reset()
  
  }
}
