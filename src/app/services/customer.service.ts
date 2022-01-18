import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiServiceUrl:string = `${environment.apiUrl}/customers`

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Customer>>{
    let path = `${this.apiServiceUrl}/getall`
    return this.httpClient.get<ListResponseModel<Customer>>(path);
  }

  get(customerId:number):Observable<SingleResponseModel<Customer>>{
    let path = `${this.apiServiceUrl}/getbyid?customerId=${customerId}`
    return this.httpClient.get<SingleResponseModel<Customer>>(path);
  }


  getAllWithDetails():Observable<ListResponseModel<CustomerDetail>>{
    let path = `${this.apiServiceUrl}/getAllWithDetails`
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(path);
  }

  getWithDetails(customerId:number):Observable<ListResponseModel<CustomerDetail>>{
    let path = `${this.apiServiceUrl}/getwithdetails?customerId=${customerId}`
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(path);
  }
  getDetailsByMail(email:string):Observable<SingleResponseModel<CustomerDetail>>{
    let path = `${this.apiServiceUrl}/getdetailsbymail?email=${email}`
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(path);
  }

  delete(customer : Customer){
    let path = `${this.apiServiceUrl}/delete`
    return this.httpClient.post<ResponseModel>(path, customer);
  }

  update(customer : Customer){
    let path = `${this.apiServiceUrl}/update`
    return this.httpClient.post<ResponseModel>(path, customer);
  }

}
