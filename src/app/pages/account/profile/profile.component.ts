import { ActivatedRoute, Router } from '@angular/router'
import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MessageRequest, ProfileService } from '../../../shared/services/profile.service';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar'

import { AppBaseComponent } from '../../../shared/components/app-base/app-base.component'
import { CookiesData } from '../../../shared/services/cookies/CookiesData.service'
import { NgForm } from '@angular/forms'
import { UserAdsService } from '../../../shared/services/product.service'
import { ViewportScroller } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  extends AppBaseComponent implements OnInit, OnDestroy {

  userProfile
  public grid: string = 'col-lg-3 col-md-6'
  public layoutView: string = 'grid-view'
  public all_products: any[] = []
  public products: any[] = []
  pageSize = 20
  page = 0
  start = 0
  public finished: boolean = false  // boolean when end of data is reached


  chatMessagesData = []
  chatData: []

  chatSubmit: boolean
  userNameChat:string
  selectedUser
  myInterestCategoriesArr= []
  selectedInterestCategoriesArr:any= []
  @ViewChild('chatPS') chatPS: PerfectScrollbarComponent
  @ViewChild('f') f: NgForm

  model = {
    left: true,
    middle: false,
    right: false
  }
  constructor(
    injector: Injector,
    public ProfileService: ProfileService,
    private cookie: CookiesData,
    public productService:UserAdsService,
    private route: ActivatedRoute, 
    private router: Router,
    private viewScroller: ViewportScroller
    ) {
      super(injector)

  }

  ngOnInit(): void {
    if (this.cookie.checkUserProfile) this.userProfile = JSON.parse(this.cookie.getUserProfile())
  }

  // get my ads

  myAds(){
   const getSub =  this.ProfileService.myAds(String(this.page), String(this.pageSize)).subscribe(result => {
      this.all_products = result.response.data 
      this.addItems(this.start, this.pageSize)  
    })
    this.unsubscribe.push(getSub)
  }

  myChat(){
    const getSub =  this.ProfileService.myChat(String(this.page)).subscribe(result => {
       this.chatData = result.response.data 
       
     })
     this.unsubscribe.push(getSub)
   }


   
   nextPageById(message_id,room){
     this.chatMessagesData = []
    const getSub =  this.ProfileService.nextPageById(message_id,room).subscribe(result => {
       this.chatMessagesData = result.response.data.slice().reverse()
       setTimeout(() => {
        this.chatPS.directiveRef.scrollToBottom()
      }, 200)
     })
     this.unsubscribe.push(getSub)
   }
   
   categoryInterestGet(){
    const getSub =  this.ProfileService.categoryInterestGet('0').subscribe(result => {
       this.myInterestCategoriesArr = result.response.data 
     })
     this.unsubscribe.push(getSub)
   }
   
   myInterestCategories(){
    const getSub =  this.ProfileService.myInterestCategories().subscribe(result => {
     this.selectedInterestCategoriesArr = result.response.data.map(({id}) =>(id))
     console.log('  this.selectedInterestCategoriesArr: ',   this.selectedInterestCategoriesArr);
      
     })
     this.unsubscribe.push(getSub)
   }
   
  addItems(index, sum) {  
    if(this.products.length < this.all_products.length){
      this.finished = true
      for (let i = index; i < sum; ++i) {  
        this.products = this.all_products
      }  
    }
  
  }
  
  onScroll(){
    this.start = this.pageSize  
    this.pageSize += 20  
    this.myAds()  
  }

  onChangeTabe(v){
    if(v.nextId === 'ngb-tab-1'){
      this.myAds()
    }else if(v.nextId === 'ngb-tab-2'){
      this.myChat()
    }else if(v.nextId === 'ngb-tab-3'){
      this.categoryInterestGet()
      this.myInterestCategories()
    }
  }

  messageSave(f:NgForm){
    if(this.selectedUser){
      const body :any ={
        ad_item: this.selectedUser?.itemId,
        device_id: 'web',
        device_model: 'web',
        message: f.value.message,
        room:  this.selectedUser?.room,
        sender:  this.selectedUser?.senderId,
      }
      const sndMsgSub = this.ProfileService.sndMsg(body).subscribe(res =>{
        body['senderId'] = this.selectedUser?.senderId
        this.chatMessagesData.push(body)
        
        f.reset()
        setTimeout(() => {
          this.chatPS.directiveRef.scrollToBottom()
        }, 100)
      })
      this.unsubscribe.push(sndMsgSub)
    }
   
  }

  chatUsername(data) {
    this.selectedUser = data
    this.userNameChat = data.reciverName
    this.nextPageById(null, data.room)
    this.f.reset()
 
  }

  onSubmitInterests(f:NgForm){
    
    const saveCategoryInterestSub = this.ProfileService.saveCategoryInterest(this.selectedInterestCategoriesArr,this.userProfile.id).subscribe(res => {
      

    })
    this.unsubscribe.push(saveCategoryInterestSub)
  }

}
