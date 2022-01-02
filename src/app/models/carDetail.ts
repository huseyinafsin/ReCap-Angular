import { CarImage } from "./carImage";

export interface CarDetail {
  id:number;
  brandId:number
  colorId:number
  carName:string;
  brandName:string;
  colorName:string;
  modelYear:number;
  images:CarImage[];
  dailyPrice:number;
  description:string;
}
