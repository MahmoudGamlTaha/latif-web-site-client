import { Component, Input, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-element',
  templateUrl: './input-element.component.html',
  styleUrls: ['./input-element.component.scss']
})
export class InputElementComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label:number;
  @Input() required:boolean;
  @Input() inputType:string;
  @Input() Name:string;

  constructor() { }

  ngOnInit(): void {
  }

}
