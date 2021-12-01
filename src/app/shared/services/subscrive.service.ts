import { BasicResponse } from '../models/reponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubscribeService {

    constructor(private http: HttpClient) { }

    subscriptionTypes(page: string | null | undefined, size: string | null | undefined): Observable<BasicResponse> {
        let url_ = server.url + "/api/public/subscriptionTypes?";
        if (page !== undefined && page !== null)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (size !== undefined && size !== null)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_)
    }
}


