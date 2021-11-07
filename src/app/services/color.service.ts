import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http'
import { Observable } from 'rxjs';

import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl:string = "https://localhost:44310/api/colors/getall";

  constructor(private httpclient: HttpClient) { }

  getColors():Observable<ColorResponseModel>{
      return this.httpclient.get<ColorResponseModel>(this.apiUrl);
  }
}
