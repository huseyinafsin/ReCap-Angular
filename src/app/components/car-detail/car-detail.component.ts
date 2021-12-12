import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarDetailComponent implements OnInit {
  car!:CarDetail
  dataLoaded:boolean = false
  apiPath="https://localhost:44310/"
  carFilterText:string

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private config: NgbCarouselConfig) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailById(params['carId']);
        this.config.interval = 10000;
        this.config.wrap = false;
        this.config.keyboard = false;
        this.config.pauseOnHover = false;
      }
    });
  }

  getCarDetailById(carId:number){
    return this.carService.getCarDetailById(carId).subscribe(response=>{
      this.car = response.data
      this.dataLoaded = true
    })
  }

}




