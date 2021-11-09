import { BasicResponse } from '../models/reponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  myAds(page: string | null | undefined, pageSize: string | null | undefined): Observable<BasicResponse> {
    let url_ = server.url + "api/public/ads/myAds?";
    if (page !== undefined && page !== null)
      url_ += "page=" + encodeURIComponent("" + page) + "&";
    if (pageSize !== undefined && pageSize !== null)
      url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_)
  }

  myChat(page: string | null | undefined): Observable<BasicResponse> {
    let url_ = server.url + "api/public/chat/my-chat?";
    if (page !== undefined && page !== null)
      url_ += "page=" + encodeURIComponent("" + page) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_)
  }


  nextPageById(message_id: string | null | undefined, room: string | null | undefined): Observable<BasicResponse> {
    let url_ = server.url + "api/public/chat/next-page-by-id?";
    if (message_id !== undefined && message_id !== null)
      url_ += "message_id=" + encodeURIComponent("" + message_id) + "&";
    if (room !== undefined && room !== null)
      url_ += "room=" + encodeURIComponent("" + room) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_)
  }

  sndMsg(request: MessageRequest): Observable<BasicResponse> {
    let url_ = server.url + "api/public/chat/snd-msg";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(request);
    return this.http.post<any>(url_, content_)
  }


}


export interface MessageRequest {
  ad_item: number | undefined;
  device_id: string | undefined;
  device_model: string | undefined;
  message: string | undefined;
  recevier: number | undefined;
  room: string | undefined;
  sender: number | undefined;
}