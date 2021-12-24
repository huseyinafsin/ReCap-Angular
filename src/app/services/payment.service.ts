import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  apiServiceUrl:string = `${environment.apiUrl}/payments`

  constructor(private httpClient:HttpClient) { }

  getPayments():Observable<ListResponseModel<Payment>>{
    let path = `${this.apiServiceUrl}/getall`
    return this.httpClient.get<ListResponseModel<Payment>>(path)
  }

  getPaymentById(paymentId:number):Observable<SingleResponseModel<Payment>>{
    let path = `${this.apiServiceUrl}/getbyid`
    return this.httpClient.get<SingleResponseModel<Payment>>(path)

  }

  addPayment(payment:Payment):Observable<ResponseModel>{
    let path = `${this.apiServiceUrl}/add`
    return this.httpClient.post<ResponseModel>(path,payment)
  }

}

