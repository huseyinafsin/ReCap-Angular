import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalService } from 'src/app/services/rental.service';
import {FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Color } from 'src/app/models/color';
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

  constructor(
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private creditCardService: CreditCardService
  ) {}

  ngOnInit(): void {
    this.creditCardCheckForm();
    this.activatedRoute.params.subscribe((params) => {
      this.carId = Number( params['id'])
        this.initLocalStorage();
        this.getCarDetailById(params['id']);
    });
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

  creditCardCheckForm() {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardHolderFullName: ['', Validators.required],
      cvc: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
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

  getCreditCardByCardNumber(creditCardNumber: string): number {
    let result: number;
    this.creditCardService
      .getCreditCardByCardNumber(creditCardNumber)
      .subscribe((response) => {
        result = response.data;
      });

    return result;
  }

  addRental() {
    let customerId = 2; //will taken from login session
    let creditCardModel = Object.assign({}, this.creditCardForm.value);
    let cart = {
      cardHolderFullName: creditCardModel.cardHolderFullName,
      cardNumber: creditCardModel.cardNumber,
      expiredYear: creditCardModel.expiredYear,
      expiredMonth: creditCardModel.expiredMonth,
      cvc: creditCardModel.cvc,
      amount: this.totalAmount,
      carId: this.car.id,
      customerId: customerId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };

    this.rentalService.addRental(cart).subscribe((response) => {
      if (response.success) {
        this.toasterService.success('Başarılı', response.message);
      } else {
        this.toasterService.error('Başarısız', 'Ürün kiralanmadı');
      }
    });
  }
}
