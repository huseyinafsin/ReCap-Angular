import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiServiceUrl:string = `${environment.apiUrl}/rentals`
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDto>>{
    let path = `${this.apiServiceUrl}/details`
    return this.httpClient.get<ListResponseModel<RentalDto>>(path);
  }

  addRental(cart:Cart):Observable<any>{
    let path = `${this.apiServiceUrl}/rent`
    console.log("CART:"+cart)
    return this.httpClient.post<any>(path,cart);
  }

  isRentable(carId:number,rentDate:Date,returnDate:Date):Observable<SingleResponseModel<boolean>>{
    let path = this.apiServiceUrl + '/isrentable?carId=' + carId +'&rentDate=' +rentDate +'&returnDate=' +returnDate
    return this.httpClient.get<SingleResponseModel<boolean>>(path);
  }
}
