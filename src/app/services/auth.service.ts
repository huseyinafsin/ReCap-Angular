import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStrorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiServiceUrl = `${environment.apiUrl}/auth`

  constructor(private httpClient:HttpClient,
              private localStorageService:LocalStrorageService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let path =`${this.apiServiceUrl}/login`
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, loginModel);
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let path =`${this.apiServiceUrl}/register`
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, registerModel);
  }

  isAuthenticated(){
    if(this.localStorageService.getData("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
