import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';

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
}
