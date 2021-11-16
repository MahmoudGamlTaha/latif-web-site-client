import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { server } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class CategoryService{
 private category:any;

 constructor(private http: HttpClient,
    private toastrService: ToastrService) { }
  
 public getCategoryByTypeId(type:number): Observable<any[]>{
   if(type == 0){
     let url = server.url + '/api/public/ads-type/list';
     return this.http.get<any[]>(url);  
   }
    let url = server.url + '/api/public/cat-by-adType/type='+type;
    
    return this.http.get<any[]>(url);
 }
 public getPetCategory(): Observable<any[]>{
   let url = server.url + '/api/public/cat-by-adType/type=1'
   
   return this.http.get<any[]>(url);
 }

}