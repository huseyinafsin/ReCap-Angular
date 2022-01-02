import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarDetailComponent implements OnInit {
  car:CarDetail
  images:CarImage[]=[]
  dataLoaded:boolean = false
  apiPath="https://localhost:44310/"
  carFilterText:string
  dateForm:FormGroup
  currentDate:Date =new  Date();

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private config: NgbCarouselConfig,
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private rentalService:RentalService,
    private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailById(params['carId']);
        this.config.interval = 10000;
        this.config.wrap = false;
        this.config.keyboard = false;
        this.config.pauseOnHover = false;
        this.config.showNavigationArrows=true
        this.createDateForm();
      }

    });

  }


  getCarDetailById(carId:number){
    return this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.car = response.data
      this.images =response.data.images
      this.dataLoaded = true
    })
  }

  createDateForm(){
    this.dateForm = this.formBuilder.group({
      rentDate : ["",Validators.required],
      returnDate : ["",Validators.required]
    })
  }

  rent(){
    if(this.dateForm.valid){
      let dateModel =  Object.assign({},this.dateForm.value)

      this.rentalService.isRentable(this.car.id, dateModel.rentDate, dateModel.returnDate).subscribe(response=>{
        if(response.data){
          this.toasterService.success("Yönlendiriyorsunuz","Başarılı");
          this.route.navigate(['rentals/rent/'+this.car.id])
          localStorage.setItem('dateModel',JSON.stringify(dateModel))
          localStorage.setItem('carId',JSON.stringify(this.car.id))
        }else{
          this.toasterService.error( "Bu araç bu tarihler arasında zaten kiralanmış","Hata !")
        }
      },responseError=>{
        if(responseError.error.ValidationErrors.lengh > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toasterService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }
      })

    }else{
      this.toasterService.error("Formunuz Eksik","Dikkat")
    }
  }

  getMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
}




