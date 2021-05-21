import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserAds } from '../../../../shared/classes/UserAds';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  @Input() products: UserAds[] = [];
  @Input() colors: any[] = [];

  @Output() colorsFilter  : EventEmitter<any> = new EventEmitter<any>();
  
  public collapse: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
  }

  get filterbycolor() {
    const uniqueColors = []
    this.products.filter((product) => {
     
    });
    return uniqueColors
  }

  appliedFilter(event) {
    let index = this.colors.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)   
        this.colors.push(event.target.value); // push in array cheked value
    else 
        this.colors.splice(index,1);  // removed in array unchecked value
    
    let colors = this.colors.length ? { color: this.colors.join(",") } : { color: null };    
    this.colorsFilter.emit(colors);
  }

  // check if the item are selected
  checked(item){
    if(this.colors.indexOf(item) != -1){
      return true;
    }
  }

}
