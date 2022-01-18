import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { MailSubscribe } from '../models/mailSubscribe';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiServiceUrl = `${environment.apiUrl}/mailsubscribe`

  constructor(private httpClient:HttpClient) {}

  getBrands():Observable<ListResponseModel<MailSubscribe>>{
    let path = `${this.apiServiceUrl}/getall`
    return this.httpClient.get<ListResponseModel<MailSubscribe>>(path);
  }

  add(mail:MailSubscribe):Observable<ResponseModel>{
    let path = `${this.apiServiceUrl}/add`
    return this.httpClient.post<ResponseModel>(path,mail);
  }

}
