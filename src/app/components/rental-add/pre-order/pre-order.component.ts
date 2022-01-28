import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rent-detail',
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {
  car :CarDetail
  apiUrl:string = environment.Url
  rentForm :FormGroup
  currentUser:UserForLogin
  currentCustomer:CustomerDetail
  canRent:boolean = false
  minStartDate: Date = new Date();
  minEndDate: Date = new Date();

  constructor(private carService: CarService,
              private routerActive:ActivatedRoute,
              private rentalService:RentalService,
              private customerService:CustomerService,
              private authService : AuthService,
              private formBuilder:FormBuilder,
              private toasterService:ToastrService,
              private route:Router) { }

    ngOnInit(){
      this.initForm()
      this.routerActive.params.subscribe(params=>{
      this.getCar(params['id']);
      this.currentUser = this.authService.getUser()
      this.getCustomer(this.currentUser.email);
    })


  }
  initForm(){
    this.rentForm = this.formBuilder.group({
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],
    })
  }

  onSubmit(){
    if(this.rentForm.valid){
      let dateModel =  Object.assign({},this.rentForm.value)

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
        if(responseError.error.ValidationErrors > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toasterService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }
      })

    }else{
      this.toasterService.error("Formunuz Eksik","Dikkat")
    }
  }
  getCar(carId:number){
    this.carService.getCarDetailsById(carId)
      .subscribe(response =>{
        this.car = response.data;
      })
  }

  // getFindexScore(customerId:number){
  //   this.customerServie.getFindexScore;
  // }

  getCustomer(email:string){
    this.customerService.getDetailsByMail(email).subscribe(response =>{
      this.currentCustomer = response.data;
    })
  }
}
