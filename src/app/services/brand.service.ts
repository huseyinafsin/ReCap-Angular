import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiServiceUrl = `${environment.apiUrl}/brands`

  constructor(private httpClient:HttpClient) {}

  getBrands():Observable<ListResponseModel<Brand>>{
    let path = `${this.apiServiceUrl}/getall`
    return this.httpClient.get<ListResponseModel<Brand>>(path);
  }
}
