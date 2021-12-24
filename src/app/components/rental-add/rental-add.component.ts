import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalService } from 'src/app/services/rental.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Cart } from 'src/app/models/cart';
@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rental:RentalDto
  car:CarDetail
  creditCardForm:FormGroup
  totalAmount:number = 0
  dataLoaded:boolean=false
  apiPath="https://localhost:44310/"
  constructor(private rentalService:RentalService,
              private formBuilder:FormBuilder,
              private carService:CarService,
              private activatedRoute:ActivatedRoute,
              private toasterService:ToastrService,
              private creditCardService:CreditCardService) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
          this.getCarDetailById(params['id']);
    })
    this.creditCardCheckForm()
  }

  creditCardCheckForm(){
    this.creditCardForm = this.formBuilder.group({
      cardNumber : ["",Validators.required],
      cardHolderFullName : ["", Validators.required],
      cvc : ["", Validators.required],
      expiredMonth : ["", Validators.required],
      expiredYear : ["", Validators.required],
    })
  }

   getCarDetailById(carId:number){
    return this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.car = response.data
      this.dataLoaded = true
    })
  }


  getImageUrl(carId:number):string{
    let image = this.car?.images.find(x=>x.carId==carId)
    if (image!=null)
      return this.apiPath+ image.imagePath

    else
      return this.apiPath+"Images/CarImages/default.jpg"
  }

  checkCreditCard(crediCardModel:any):boolean{
    let result:boolean
    this.creditCardService.checkCreditCard( crediCardModel).subscribe(response =>{
        result = response.data;
        console.log(response.data)
    });
    return result;
  }

  getCreditCardByCardNumber(creditCardNumber:string):number{
    let result:number
    this.creditCardService.getCreditCardByCardNumber(creditCardNumber).subscribe(response=>{
      result = response.data
    })

    return result;
  }

  addRental(){


    let customerId = 2 //will taken from login session
    let creditCardModel =  Object.assign({}, this.creditCardForm.value)
    let dateModel = JSON.parse(localStorage.getItem('dateModel'))


    let rentDate = new Date(dateModel.rentDate);
    let returnDate =new Date(dateModel.returnDate);

    let amount = ((returnDate.getMonth() - rentDate.getMonth())*30 +
                     returnDate.getDay() - rentDate.getDay() ) * this.car.dailyPrice;

    let cart={
                cardHolderFullName:creditCardModel.cardHolderFullName,
                cardNumber:creditCardModel.cardNumber,
                expiredYear: creditCardModel.expiredYear,
                expiredMonth: creditCardModel.expiredMonth,
                cvc:creditCardModel.cvc,
                amount:amount,
                carId:this.car.id,
                customerId:customerId,
                rentDate: rentDate,
                returnDate: returnDate
              }

      this.rentalService.addRental(cart).subscribe(response=>{
        if (response.success) {
          this.toasterService.success("Başarılı",response.message);
        }
        else{
          this.toasterService.error("Başarısız","Ürün kiralanmadı")
        }
      })

  }


}


