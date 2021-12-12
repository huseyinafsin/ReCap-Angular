import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiServiceUrl:string = `${environment.apiUrl}/colors`

  constructor(private httpclient: HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
      let path = `${this.apiServiceUrl}/getall`
      return this.httpclient.get<ListResponseModel<Color>>(path);
  }
}
