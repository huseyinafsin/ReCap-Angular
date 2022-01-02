import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup
  brands:Brand[] = []
  colors:Color[] = []
  progress: number;
  message: string;
  onUploadFinished: any;
  @ViewChild('file') file:HTMLInputElement;

  constructor(private carService:CarService,
              private router:Router,
              private colorService:ColorService,
              private brandService:BrandService,
              private formBuilder:FormBuilder,
              private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getColors()
    this.getBrands()
    this.createCarAddForm()
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      daiyPrice:["",Validators.required],
      description:["",Validators.required],
      images:[]
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(repsonse =>{
      this.brands = repsonse.data;
    })
  }

  addCar(){
    if (this.carAddForm.valid) {

      let carModel =Object.assign({}, this.carAddForm.value)

      let car:Car = {
                     id:undefined,
                     carName:carModel.carName,
                     brandId:carModel.brandId,
                     colorId:carModel.colorId,
                     daiyPrice:carModel.daiyPrice,
                     modelYear:carModel.modelYear,
                     description:carModel.description,

      }

      this.carService.add(car).subscribe(response =>{

          // let formData = new FormData();
          // if(carModel.images.length > 0){
          //     for (let i = 0; i < carModel.images; i++) {
          //       let carImage:CarImage={id:undefined, carId:car.id,imagePath:undefined, date:new Date}
          //       this.upload(carModel.images[i],carImage);
          //     }
          // }
          this.toasterService.success(response.message,"Başarılı");
          this.router.navigate(['/cars/'])
      })

    }
  }



  // public  upload(file:File, carImage:CarImage){

  //   this.carImageService.add(file, carImage).subscribe(event =>{
  //     if(event.type === HttpEventType.UploadProgress){
  //       this.progress = Math.round(100 * event.loaded / event.total);
  //     }
  //     else if(event.type === HttpEventType.Response){
  //       this.message = 'Upload Succes.';
  //       this.onUploadFinished.emit(event.body);
  //     }
  //   })
  // }

}

