import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  colors:Color[]
  brands:Brand[]
  filterTextColor:string =''
  filterTextBrand:string =''
  @Output() selectedColor = new EventEmitter<Color>();
  @Output() selectedBrand = new EventEmitter<Brand>();
  @Output() filteredColor = new EventEmitter<string>();
  @Input() filteredBrand = new EventEmitter<string>();

  constructor(private colorService:ColorService,
              private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
  }

  getColors(){
    this.colorService.getColors().subscribe(
      response=>{
        this.colors = response.data;
      }
    )
  }
  getBrands(){
    this.brandService.getBrands().subscribe(
      response =>{
        this.brands = response.data;
      }
    )
  }
  onSearchColor(){
    this.filteredColor.emit(this.filterTextColor)
  }

}
