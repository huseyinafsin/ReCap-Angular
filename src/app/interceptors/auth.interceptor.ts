import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStrorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStrorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localStorageService.getData<string>('token')
    let newRequest:HttpRequest<any>;

    newRequest = request.clone({
      headers: request.headers.set("Authorization","Bearer " +token)
    });
    return next.handle(newRequest);
  }
}
