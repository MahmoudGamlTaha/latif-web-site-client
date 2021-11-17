import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-element',
  templateUrl: './checkbox-element.component.html',
  styleUrls: ['./checkbox-element.component.scss']
})
export class CheckboxElementComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label:number;
  @Input() required:boolean;
  @Input() Name:string;
  @Input() form:FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
