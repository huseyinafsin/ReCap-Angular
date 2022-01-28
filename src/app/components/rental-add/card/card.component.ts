import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  customerCards:CreditCard[] =[]
  @Input() customerId:number
  @Output() selectedCardId:EventEmitter<number> = new EventEmitter<number>();
  constructor(private creditCardService:CreditCardService) { }

  ngOnInit(): void {
    this.getcardsbycustomerId(3);
  }
  onSelect(cardId:number){
    this.selectedCardId.emit(cardId);
  }


  getcardsbycustomerId(customerId:number){

    this.creditCardService.getCardsByCustomerId(3).subscribe(response=>{
      this.customerCards = response.data
    })
  }
}
