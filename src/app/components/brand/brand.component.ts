import { Component, OnInit, Output } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands!:Brand []
  hello:string="Merhaba"
  currentBrand!:Brand
  filterText:string=""
  dataLoaded:boolean = false;

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrandClass(brand:Brand){
    this.currentBrand = brand
  }

  getCurrentBrandClass(brand:Brand){
    if(brand  == this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setAllBrandClass(){
    this.currentBrand = null
  }

  getAllBrandClass(){
    if(this.currentBrand == null){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
