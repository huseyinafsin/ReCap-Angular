import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  dataLoaded: boolean;
  brands:Brand[]=[];

  constructor(private brandService:BrandService,
              private toasterService:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
      this.dataLoaded = true
    })
  }
  addBrand(){
    Swal.fire({
      title: 'Firma Ekleme',
      html: `<input type="text" id="brandName" class="swal2-input" placeholder="Firma ismi">`,
      confirmButtonText: 'Ekle',
      confirmButtonColor:"green",
      focusConfirm: false,
      showCancelButton:true,
      cancelButtonText:'İptal',
      cancelButtonColor:'red',
      preConfirm: () => {
        const brandName = (<HTMLInputElement> Swal.getPopup().querySelector('#brandName')).value
        if (!brandName ) {
          Swal.showValidationMessage(`Lütfen firma ismi giriniz`)
        }
        return { brandName: brandName }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let brand:any = {name:result.value.brandName  }
        this.brandService.add(brand).subscribe(response =>{
                  if(response.success){
                    this.toasterService.success("Başarılı",response.message)
                  }else{
                    this.toasterService.error("Hata",response.message)
                    Swal.fire(`
                    ${result.value.brandName} firması eklendi
                  `.trim())
                  location.reload()
                  }
        })
      }

    })
  }

  updateBrand(brandId:number){
    Swal.fire({
      title: 'Firma Güncelleme',
      html: `<input type="text" id="brandName" class="swal2-input" placeholder="Firma ismi">`,
      confirmButtonText: 'Güncelle',
      confirmButtonColor:"green",
      focusConfirm: false,
      showCancelButton:true,
      cancelButtonText:'İptal',
      cancelButtonColor:'red',
      preConfirm: () => {
        const brandName = (<HTMLInputElement> Swal.getPopup().querySelector('#brandName')).value
        if (!brandName ) {
          Swal.showValidationMessage(`Lütfen firma ismi giriniz`)
        }
        return { brandName: brandName }
      }
    }).then((result) => {
      if (result.isConfirmed) {

        let brand:Brand = {id:brandId, name:result.value.brandName  }

        this.brandService.update(brand).subscribe(response =>{
                  if(response.success){
                    this.toasterService.success("Başarılı",response.message)
                  }else{
                    this.toasterService.error("Hata",response.message)
                    Swal.fire(`
                   Firma ${result.value.brandName}  olarak güncellendi.
                  `.trim())
                  this.router.navigate(['', 'brands']);
                  }
        })
      }

    })
  }

  deleteBrand(brand:Brand){
    Swal.fire({
      title: brand.name +' adlı firma silinecek. Onaylıyor musunuz?',
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

        this.brandService.delete(brand).subscribe(response =>{
                  if(response.success){
                    this.toasterService.success("Başarılı",response.message)
                  }else{
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: brand.name +' silindi',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  this.toasterService.error("Hata",response.message)
                  this.router.navigate(['', 'brands']);
                  }
        })
      }

    })
  }

}
