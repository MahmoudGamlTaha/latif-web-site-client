import { BasicResponse } from '../models/reponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    const content_ = JSON.stringify(loginRequest);
    return this._http.post<any>(server.url + "/login", content_)
  }

  logout(userId): Observable<any> {

    return this._http.post(server.url + `/api/public/account/logout?user=${userId}`,'')
  }
  
  profile(): Observable<BasicResponse> {
    return this._http.get<any>(server.url + "/api/public/account/profile")
  }

  registration(registerUserRequest: RegisterUserRequest): Observable<BasicResponse> {
    const content_ = JSON.stringify(registerUserRequest);
  
    return this._http.post<any>(server.url + "/api/public/account/registration", content_)
  }

  countries(): Observable<BasicResponse> {
    return this._http.get<any>(server.url + "/api/public/countries")
  }

  cities(country: number): Observable<BasicResponse> {
    return this._http.get<any>(server.url + `/api/public/city/find-by-country-id?country=${country}`)
  }
  
}

export interface LoginRequest {
  mobile: string | undefined;
  password: string | undefined;
  token: string | undefined;

}


export interface RegisterUserRequest {
  address: string | undefined;
  city: number | undefined;
  country: number | undefined;
  device: string | undefined;
  email: string | undefined;
  latitude: string | undefined;
  longitude: string | undefined;
  name: string | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
  phone: string | undefined;
  state: string | undefined;
}