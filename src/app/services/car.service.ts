import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiServiceUrl:string = `${environment.apiUrl}/cars`

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/getall`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/getbycolor?colorId=${colorId}`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/getbybrand?brandId=${brandId}`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path)
  }

  getCarDetailById(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/cardetailsbyid?carId=${carId}`
    return this.httpClient.get<SingleResponseModel<CarDetail>>(path)
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/cardetails`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path)
  }
}
