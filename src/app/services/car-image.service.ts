import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

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
    let path = `${this.apiServiceUrl}/getallcarimagesbyid?carId=${carId}`
    console.log("Path:"+path)
    return this.httpClient.get<ListResponseModel<CarImage>>(path)
  }

  getImageById(imageId:number):Observable<SingleResponseModel<CarImage>>{
    let path = `${this.apiServiceUrl}/getbyid?carImageId=}${imageId}`
    return this.httpClient.get<SingleResponseModel<CarImage>>(path)
  }

  upload(file:File, carId:number):Observable<HttpEvent<ResponseModel>>{
    let path = `${this.apiServiceUrl}/upload`
    const sendForm = new FormData();
    sendForm.append('carId', JSON.stringify(carId))
    sendForm.append('file', file, file.name)

    return this.httpClient.post<ResponseModel>(path,sendForm, { reportProgress:true, observe :'events'});
  }
  delete(carImage:CarImage):Observable<HttpEvent<ResponseModel>>{
    let path = `${this.apiServiceUrl}/delete`
    return this.httpClient.post<HttpEvent<ResponseModel>>(path,carImage);
  }
}
