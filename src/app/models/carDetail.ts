import { CarImage } from "./carImage";

export interface CarDetail {
  id:number;
  carName:string;
  brandName:string;
  colorName:string;
  modelYear:number;
  images:CarImage[];
  dailyPrice:number;
  description:string;
}
