import { Component, HostListener, Input, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CookiesData } from '../../services/cookies/CookiesData.service';
import { Router } from '@angular/router';
import { server } from 'src/environments/environment';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  siteName:string;
  public stick: boolean = false;

  userProfile ;

  constructor(
    private cookie:CookiesData,
    private cookieService: CookieService,
    private router: Router,
    private _authService:AuthService
  ) { 
    this.siteName = server.name;
  }

  ngOnInit(): void {
    if(this.cookie.checkUserProfile) this.userProfile = JSON.parse(this.cookie.getUserProfile())
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  onLogout(){
    if(this.userProfile.id){
      // this._authService.logout(this.userProfile.id).subscribe(res =>{
      //   console.log('res: ', res);
      // })
      this.cookieService.deleteAll();
      this.router.navigate(['/']).then(()=>{
        window.location.reload()
      });
    }
  
  }
}
