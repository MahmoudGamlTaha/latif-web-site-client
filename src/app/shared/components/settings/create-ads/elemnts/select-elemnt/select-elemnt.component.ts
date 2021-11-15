import { Component, Input, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-elemnt',
  templateUrl: './select-elemnt.component.html',
  styleUrls: ['./select-elemnt.component.scss']
})
export class SelectElemntComponent implements OnInit {

  @Input() control: FormControl;
  @Input() typeValue:number;
  @Input() label:number;
  @Input() required:boolean;
  @Input()listArr : []
  @Input() multiple:boolean;

  
  constructor() { }

  ngOnInit(): void {
  }

}
