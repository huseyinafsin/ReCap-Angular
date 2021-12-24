import { CreditCard } from "./creditCard";

export interface Cart{
  cardHolderFullName:string
  cardNumber:string
  expiredYear:string
  expiredMonth:string
  cvc:string
  customerId:number
  rentDate:Date
  returnDate:Date
  amount:number
}
