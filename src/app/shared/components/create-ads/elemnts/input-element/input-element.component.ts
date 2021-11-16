import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

import { Cloudinary } from '@cloudinary/angular-5.x';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  @Input() multiple:boolean;

 
  constructor(
    
  ) { 

  }

  ngOnInit(): void {
   console.log(this.inputType);

  }
  
 
}
