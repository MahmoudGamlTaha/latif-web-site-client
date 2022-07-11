import { Component, OnInit, Input } from '@angular/core';
import { server } from 'src/environments/environment';

@Component({
  selector: 'app-footer-three',
  templateUrl: './latif-footer.component.html',
  styleUrls: ['./latif-footer.component.scss']
})
export class LatifFooterComponent implements OnInit {

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
