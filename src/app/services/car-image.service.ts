import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiServiceUrl:string = `${environment.apiUrl}/carImages`

  constructor(private httpClient:HttpClient) { }

  getImages():Observable<ListResponseModel<CarImage>>{
    let path = `${this.apiServiceUrl}/getall`
    return this.httpClient.get<ListResponseModel<CarImage>>(path)
  }

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let path = `${this.apiServiceUrl}/getallcarimagesbyid?carId=}${carId}`
    return this.httpClient.get<ListResponseModel<CarImage>>(path)
  }

  getImageById(imageId:number):Observable<SingleResponseModel<CarImage>>{
    let path = `${this.apiServiceUrl}/getbyid?carImageId=}${imageId}`
    return this.httpClient.get<SingleResponseModel<CarImage>>(path)
  }

}
