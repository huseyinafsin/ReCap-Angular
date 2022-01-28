import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
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


  getCardsByCustomerId(customerId:number){
    let path = `${this.apiServiceUrl}/getcardsbycustomerId?customerId=${customerId}`
    return this.httpClient.get<ListResponseModel<CreditCard>>(path)
  }

  getCard(cardId:number) :Observable<SingleResponseModel<CreditCard>>{
    let path = `${this.apiServiceUrl}/getbyid?creditCardId=${cardId}`
    return this.httpClient.get<SingleResponseModel<CreditCard>>(path)
  }

  saveCreditCard(customerId:number , cardNumber:string){
    let path = `${this.apiServiceUrl}/savecreditcard?customerId=${customerId}&&cardNumber=${cardNumber}`
    return this.httpClient.get<SingleResponseModel<boolean>>(path);
  }
}
