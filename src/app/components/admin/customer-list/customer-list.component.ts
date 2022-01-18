import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers:CustomerDetail[] = [];
  dataLoaded:boolean  = false;

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getAllWithDetails().subscribe(response=>{
        this.customers  = response.data;
        this.dataLoaded = true;
    });
  }
}
