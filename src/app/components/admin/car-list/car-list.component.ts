import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars:CarDetail[];
  dataLoaded: boolean;

  constructor(private carService:CarService,
              private toasterService:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.getCarDetails()
  }

  getCarDetails(){
    return this.carService.getCarDetails().subscribe(response=>{
        this.cars = response.data
        this.dataLoaded = true
    });
  }

  deleteCar(car:CarDetail){
    Swal.fire({
      title: 'Bu arabayı silmek istiyor musunuz?',
      confirmButtonText: 'Sil',
      confirmButtonColor:"green",
      focusConfirm: false,
      showCancelButton:true,
      cancelButtonText:'İptal',
      cancelButtonColor:'red',
      preConfirm:() =>{
        return {}
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let _car:Car ={
           id:car.id,
           brandId:car.brandId,
           carName:car.carName,
           colorId:car.colorId,
           daiyPrice:car.dailyPrice,
           modelYear:car.modelYear,
           description:car.description,
           minFindexScore:car.minFindexScore
        }
        this.carService.delete(_car).subscribe(response =>{
                  if(response.success){
                    this.toasterService.success("Başarılı",response.message)
                  }else{
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title:  'Araba silindi',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  this.toasterService.error("Hata",response.message)
                  this.router.navigate(['', '/cars']);
                  }
        })
      }

    })
  }

}
