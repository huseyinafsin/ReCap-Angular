import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServiceUrl:string = `${environment.apiUrl}/users`

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<User>>{
    let path = `${this.apiServiceUrl}/getall`
    return this.httpClient.get<ListResponseModel<User>>(path);
  }

  getById(customerId:number):Observable<SingleResponseModel<User>>{
    let path = `${this.apiServiceUrl}/getbyid?customerId=${customerId}`
    return this.httpClient.get<SingleResponseModel<User>>(path);
  }


  delete(user:User){
    let path = `${this.apiServiceUrl}/delete`
    return this.httpClient.post<ResponseModel>(path,user);
  }

  update(user:User){
    let path = `${this.apiServiceUrl}/update`
    return this.httpClient.post<ResponseModel>(path,user);
  }

}
