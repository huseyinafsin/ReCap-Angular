import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
<<<<<<< HEAD
import { LocalStrorageService } from './local-storage.service';
=======
>>>>>>> 0b7dc44f81cece3771614c909415674047a00544

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiServiceUrl = `${environment.apiUrl}/auth`

<<<<<<< HEAD
  constructor(private httpClient:HttpClient,
              private localStorageService:LocalStrorageService) { }
=======
  constructor(private httpClient:HttpClient) { }
>>>>>>> 0b7dc44f81cece3771614c909415674047a00544

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let path =`${this.apiServiceUrl}/login`
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, loginModel);
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let path =`${this.apiServiceUrl}/register`
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, registerModel);
  }

  isAuthenticated(){
<<<<<<< HEAD
    if(this.localStorageService.getData("token")){
=======
    if(localStorage.getItem("token")){
>>>>>>> 0b7dc44f81cece3771614c909415674047a00544
      return true;
    }
    else{
      return false;
    }
  }
}
