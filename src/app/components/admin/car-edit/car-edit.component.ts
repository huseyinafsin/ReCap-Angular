import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService, } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  carEditForm: FormGroup;
  private unsubscribe = new Subject<void>()
  colors: Color[];
  brands: Brand[];
  car:CarDetail
  carId:number
  images:CarImage[]=[]
  apiUrl:string =environment.Url
  progress: number = 0;
  selectedFile:File= null
  @ViewChild('colorOpt') colorOpt: HTMLSelectElement;
  constructor(private carService:CarService,
    private carImageService:CarImageService,
    private colorService:ColorService,
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private toasterService:ToastrService,
    ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) =>{
      if (params['id']) {
        this.carId = params['id']
        this.getCarDetailById(this.carId);
        this.getCarImages(this.carId);
        this.editCarForm()
        this.getColors()
        this.getBrands()
        this.editCar()
      }
    });
  }


  editCarForm(){
    this.carEditForm = this.formBuilder.group({
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      daiyPrice:["",Validators.required],
      minFindexScore:["",Validators.required],
      description:["",Validators.required],
      image:[]
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
  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response =>{
      this.images = response.data;
    })
  }
  getCarDetailById(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.car = response.data;
      this.carId = response.data.id;
      console.log("brandİd"+this.car.carName)
      this.carEditForm.patchValue({
        carName: this.car.carName,
        brandId:this.car.brandId,
        colorId:this.car.colorId,
        modelYear : this.car.modelYear,
        daiyPrice :this.car.dailyPrice,
        minFindexScore: this.car.minFindexScore,
        description : this.car.description
      })

    });
  }
  removeImage(carImage:CarImage){
    this.carImageService.delete(carImage).subscribe(repponse =>{
      window.location.reload()
    });
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }
  onupload(){
    this.carImageService.upload(this.selectedFile,this.carId).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
      window.location.reload()
    })
  }

  editCar(){
    this.carEditForm.valueChanges.pipe().subscribe((value) => {
      console.log(value)
      let carModel = Object.assign({}, this.carEditForm.value)
      let car:Car = {
        id:this.car.id,
        carName:carModel.carName,
        brandId:carModel.brandId,
        colorId:carModel.colorId,
        daiyPrice:carModel.daiyPrice,
        modelYear:carModel.modelYear,
        description:carModel.description,
        minFindexScore:carModel.minFindexScore
      }
      if(this.carEditForm.valid){

      this.carService.update(car).subscribe(response=>{
        response.type.valueOf
      },responseError=>{
        if(responseError.error.ValidationErrors.length > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toasterService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }
      })
      }
    })
  }
  ngOnDestroy() {
    this.unsubscribe.next()
  }

}
