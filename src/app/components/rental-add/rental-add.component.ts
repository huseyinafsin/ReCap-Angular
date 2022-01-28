import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalService } from 'src/app/services/rental.service';
import {FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Color } from 'src/app/models/color';
import { Cart } from 'src/app/models/cart';
import { LocalStrorageService } from 'src/app/services/local-storage.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { UserForLogin } from 'src/app/models/userForLogin';
import { environment } from 'src/environments/environment';
import { CreditCard } from 'src/app/models/creditCard';
@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rental: RentalDto;
  car: CarDetail;
  creditCardForm: FormGroup;
  totalAmount: number = 0;
  dataLoaded: boolean = false;
  apiPath = 'https://localhost:44310/';
  rentDate: Date;
  returnDate: Date;
  vat: number = 18;
  carId: number;
  numberOfDay: number;
  subAmount: number;
  vatAdded: number;
  colors: Color[];
  newCardMode:boolean= true
  currentUser:UserForLogin
  currentCustomer:CustomerDetail
  @Output() customerId:EventEmitter<number> = new EventEmitter<number>();
  cardId: number;
  apiUrl = environment.Url
  currentCard: CreditCard;
  constructor(
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private localStorageService :LocalStrorageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private creditCardService: CreditCardService,
    private customerService:CustomerService,
    private authService : AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.activatedRoute.params.subscribe((params) => {
      this.carId = Number( params['id'])
        this.initLocalStorage();
        this.getCarDetailById(params['id']);
        this.currentUser = this.authService.getUser()
        this.getCustomer(this.currentUser.email);
    });
  }
  ngOnDestroy(): void {
    this.localStorageService.removeData("dateModel")
  }

  initLocalStorage() {
    let dateModel = JSON.parse(localStorage.getItem('dateModel'));
    this.rentDate = this.parseDate(dateModel.rentDate);
    this.returnDate = this.parseDate(dateModel.returnDate);
  }
  getCarDetailById(carId: number): void {
    this.carService.getCarDetailsById(carId).subscribe((respons) => {
      this.car = respons.data;
      this.calculate();
    });
  }


  calculate() {
    let timeInMilisec: number =this.returnDate.getTime() - this.rentDate.getTime();
    this.numberOfDay = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
    this.subAmount = this.numberOfDay * this.car.dailyPrice;
    this.vatAdded = this.subAmount * (this.vat / 100);
    this.totalAmount = this.subAmount + this.subAmount * (this.vat / 100);
  }

  parseDate(input: any) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  getImageUrl(carId: number): string {
    let image = this.car?.images.find((x) => x.carId == carId);
    if (image != null) return this.apiPath + image.imagePath;
    else return this.apiPath + 'Images/CarImages/default.jpg';
  }

  checkCreditCard(crediCardModel: any): boolean {
    let result: boolean;
    this.creditCardService
      .checkCreditCard(crediCardModel)
      .subscribe((response) => {
        result = response.data;
        console.log(response.data);
      });
    return result;
  }

  getCard(cardId:number){
    this.creditCardService.getCard(cardId).subscribe(response=>{
      this.currentCard = response.data ;
    })
  }
  saveCard(customerId:number, cardNumber:string){
    this.creditCardService.saveCreditCard(customerId, cardNumber).subscribe(response =>{
      if (response.success) {
        this.toasterService.success(response.message,"Kartınız Kaydedildi")
      }
    })

  }

  onRent(){
    let creditCardModel = Object.assign({}, this.creditCardForm.value);
    let cart:Cart
    if(this.newCardMode){

      this.getCard(this.cardId);

        cart = {
        cardHolderFullName: this.currentCard.cardHolderFullName,
        cardNumber: this.currentCard.cardNumber,
        expiredYear: this.currentCard.expireYear,
        expiredMonth: this.currentCard.expireMonth,
        cvc: this.currentCard.cvc,
        amount: this.totalAmount,
        carId: this.car.id,
        customerId: this.currentCustomer.customerId,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      }
    }
    else{
        cart = {
        cardHolderFullName: creditCardModel.cardHolderFullName,
        cardNumber: creditCardModel.cardNumber,
        expiredYear: creditCardModel.expiredYear,
        expiredMonth: creditCardModel.expiredMonth,
        cvc: creditCardModel.cvc,
        amount: this.totalAmount,
        carId: this.car.id,
        customerId: this.currentCustomer.customerId,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };
    }


    this.rentalService.addRental(cart).subscribe((response) => {
      if (response.success) {
        this.toasterService.success('Başarılı', response.message);
      } else {
        this.toasterService.error('Başarısız', 'Ürün kiralanmadı');
      }
    });
  }

  getCustomer(email:string){
    this.customerService.getDetailsByMail(email).subscribe(response =>{
      this.currentCustomer = response.data;
      this.customerId.emit(response.data.customerId);
    })
  }

  getSelectedCard(cardId:number){
    this.cardId = cardId;
  }
  onChange(){
    this.newCardMode = !this.newCardMode
  }
  initForm() {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardHolderFullName: ['', Validators.required],
      cvc: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
    });
  }
}
