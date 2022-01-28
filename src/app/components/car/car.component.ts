import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Brand } from 'src/app/models/brand'
import { CarDetail } from 'src/app/models/carDetail'
import { Color } from 'src/app/models/color'
import { BrandService } from 'src/app/services/brand.service'
import { CarImageService } from 'src/app/services/car-image.service'
import { CarService } from 'src/app/services/car.service'
import { ColorService } from 'src/app/services/color.service'
import { CarImage } from 'src/app/models/carImage'


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carFilterText:string
  apiPath="https://localhost:44310/"
  cars:CarDetail[] = []
  car:CarDetail
  images:CarImage[]=[]
  brands:Brand[]  = []
  colors:Color[]  = []
  filterBrandId : number = 0
  filterColorId : number = 0
  dataLoaded:boolean = false
  filteredColorText:string
  filteredBrandText:string



  constructor(private carService:CarService,
              private colorService:ColorService,
              private brandService:BrandService,
              private activatedRoute:ActivatedRoute,
              private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });

    this.getImages()
    this.getBrands()
    this.getColors()
  }

  getImageUrl(carId:number):string{
    let image = this.images.find(x=>x.carId==carId)
    if (image!=null)
      return this.apiPath+ image.imagePath
    else
      return this.apiPath+"Images/CarImages/default.jpg"
  }
  getCarDetails(){
    return this.carService.getCarDetails().subscribe(response=>{
        this.cars = response.data
        this.dataLoaded = true
    });
  }

  getCarsByColor(colorId:number){
    return this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByBrand(brandId:number){
    return this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getColors(){
    return this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  getBrands(){
    return this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })

  }
  getImages(){
    return this.carImageService.getImages().subscribe(response=>{
        this.images= response.data
    })
  }

  getImageById(carId:number):string{
    return this.images.find(x=>x.carId===carId).imagePath;
  }
  getCarDetailById(carId:number){
    return this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.car = response.data
      this.dataLoaded = true
    })
  }

  getSelectedBrand(brandId:number){
    if(this.filterBrandId==brandId){
      return true ;
    }
    else{
      return false;
    }

  }
  getSelectedColor(colorId:number){
    if(this.filterColorId==colorId){
      return true ;
    }
    else{
      return false;
    }

  }

  routeFilter(): string{
    if( this.filterBrandId ==0 && this.filterColorId ==0)
      return ""
    else  if( this.filterBrandId ==0 && this.filterColorId !=0)
      return `/color/${this.filterColorId}`
    else  if( this.filterBrandId !=0 && this.filterColorId ==0)
        return `/brand/${this.filterBrandId}`
    else
      return  `/brand/${this.filterBrandId}/color/${this.filterColorId}`
  }
}
