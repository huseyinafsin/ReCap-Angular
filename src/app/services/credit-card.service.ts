import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiServiceUrl:string = `${environment.apiUrl}/creditcards`
  constructor(private httpClient:HttpClient) { }

  checkCreditCard(creditCard:CreditCard):Observable<SingleResponseModel<boolean>>{
    let path = `${this.apiServiceUrl}/checkcreditcard`
    return this.httpClient.post<SingleResponseModel<boolean>>(path,creditCard)
  }
  getCreditCardByCardNumber(creditCardNumber:string):Observable<SingleResponseModel<number>>{
    let path = `${this.apiServiceUrl}/getcreditcardbycardnumber`
    return this.httpClient.post<SingleResponseModel<number>>(path,creditCardNumber)
  }

}
