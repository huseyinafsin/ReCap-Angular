import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CarImage } from 'src/app/models/carImage';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarDetailComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
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
    private formBuilder:FormBuilder) { }

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


  getMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
}




