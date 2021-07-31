import { Component, OnInit, Input } from '@angular/core';
import { server } from 'src/environments/environment';

@Component({
  selector: 'app-footer-three',
  templateUrl: './footer-three.component.html',
  styleUrls: ['./footer-three.component.scss']
})
export class FooterThreeComponent implements OnInit {

  @Input() class: string; // Default class 
  @Input() mainFooter: boolean = true; // Default true 
  @Input() subFooter: boolean = false; // Default false 
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  public siteName:string;
  public today: number = Date.now();
  
  constructor() { 
    this.siteName = server.name;
  }

  ngOnInit(): void {
  }

}
