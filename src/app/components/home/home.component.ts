import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars:CarDetail[]=[]
  apiUrl:string = environment.Url
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getTopCheapCars(5);
  }

  getTopCheapCars(top:number){
    this.carService.getTopCheapCars(top).subscribe(response =>{
      this.cars = response.data;
    })
  }
}
