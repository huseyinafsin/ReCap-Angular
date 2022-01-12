import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStrorageService {


  setData<T>(key:string, obj:T){
    const jsonObj = JSON.stringify(obj)
    localStorage.setItem(key, jsonObj);
  }
  removeData(){

  }
  getData<T>(key : string):T{
    let jsonObj  = localStorage.getItem(key)
    if (!jsonObj) return null;

    let obj =<T>JSON.parse(jsonObj);
    return obj;
  }

  clear(){
    localStorage.clear();
  }

}
