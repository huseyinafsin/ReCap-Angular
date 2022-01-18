import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
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

  getCarDetailsById(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/cardetailsbyid?carId=${carId}`
    return this.httpClient.get<SingleResponseModel<CarDetail>>(path)
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/cardetails`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path)
  }

  getTopCheapCars(top:number):Observable<ListResponseModel<CarDetail>>{
    let path = `${this.apiServiceUrl}/gettopcheapcars?top=${top}`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path)
  }


  add(car:Car):Observable<ResponseModel>{
    let path = `${this.apiServiceUrl}/add`
    return this.httpClient.post<ResponseModel>(path,car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let path = `${this.apiServiceUrl}/delete`
    return this.httpClient.post<ResponseModel>(path,car)
  }

  update(car:Car):Observable<HttpEvent<ResponseModel>>{
    let path = `${this.apiServiceUrl}/update`
    return this.httpClient.post<HttpEvent<ResponseModel>>(path,car)
  }


}
