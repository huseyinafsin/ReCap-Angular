import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordModel } from '../models/changePasswordModel';
import { CustomerForRegister } from '../models/customerForRegister';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserForLogin } from '../models/userForLogin';
import { LocalStrorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired());
  apiServiceUrl = `${environment.apiUrl}/auth`

  public get loginStatus() {
    return this.loggedIn.asObservable();
  }

  public get isLoggedIn() {
    return this.loggedIn.getValue();
  }

  public set isLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }
  constructor(private httpClient:HttpClient,
              private localStorageService:LocalStrorageService,
              private jwtHelperService: JwtHelperService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let path =`${this.apiServiceUrl}/login`
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, loginModel);
  }

  register(registerModel:RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let path =`${this.apiServiceUrl}/register`
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, registerModel);
  }

  customerRegister(customerForRegister:CustomerForRegister): Observable<SingleResponseModel<TokenModel>> {
    let path =`${this.apiServiceUrl}/customerRegister`
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, customerForRegister);
  }

  logOut() {
    this.localStorageService.removeData("token");
    this.loggedIn.next(false);
  }

  isAuthenticated(){
    if(this.localStorageService.getData("token")){
      return true;

    }
    return false;
  }

  private isTokenExpired(): boolean {
    let token = this.getToken();
    if (token != null) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }

  private getToken(): string | null {
    return this.localStorageService.getData("token");
  }

  getUser(): UserForLogin | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(this.jwtHelperService.decodeToken(token));
      let user: UserForLogin = new UserForLogin;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            user.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            user.name = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.roles = detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = Number(detail[1]);
          }
        }
      });
      if (!user.roles) {  //if the user does not have a role
        user.roles = [];
      }
      return user;
    }
    return undefined;
  }

  hasRole(user: UserForLogin, role: string): boolean {
    if (user.roles.indexOf(role) !== -1) {
      return true;
    }
    return false;
  }

  changePassword(changePasswordModel: ChangePasswordModel): Observable<ResponseModel> {
    let path =`${this.apiServiceUrl}/changepassword`;
    return this.httpClient.post<ResponseModel>(path, changePasswordModel);
  }
}
