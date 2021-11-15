import { Component, Input, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-type-radio',
  templateUrl: './type-radio.component.html',
  styleUrls: ['./type-radio.component.scss']
})
export class TypeRadioComponent implements OnInit {


  @Input() control: FormControl;
  @Input() options:[];
  @Input() label:number;
  @Input() required:boolean;

  loading = false
  constructor( ) { }

  ngOnInit(): void {
  }



}
