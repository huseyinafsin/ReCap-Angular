import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {
  colors:Color[] =[]
  dataLoaded: boolean= false;
  constructor(private colorService:ColorService,
              private toasterService:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
      this.dataLoaded = true;
    })
  }
  addColor(){
    Swal.fire({
      title: 'Renk Ekleme',
      html: `<input type="text" id="colorName" class="swal2-input" placeholder="Renk ismi">`,
      confirmButtonText: 'Ekle',
      confirmButtonColor:"green",
      focusConfirm: false,
      showCancelButton:true,
      cancelButtonText:'İptal',
      cancelButtonColor:'red',
      preConfirm: () => {
        const colorName = (<HTMLInputElement> Swal.getPopup().querySelector('#colorName')).value
        if (!colorName ) {
          Swal.showValidationMessage(`Lütfen ismi doğru giriniz`)
        }
        return { colorName: colorName }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let color:any = {name:result.value.colorName}
        this.colorService.add(color).subscribe(response =>{
                  if(response.success){
                    this.toasterService.success("Başarılı",response.message)
                    Swal.fire(`
                    ${result.value.colorName} rengi eklendi
                  `.trim())
                  this.router.navigate(['', 'colors']);
                  }else{
                    this.toasterService.error("Hata",response.message)
                  }
        })
      }

    })
  }

  updateColor(colorId:number){
    Swal.fire({
      title: 'Renk Günceleme',
      html: `<input type="text" id="colorName" class="swal2-input" placeholder="Renk ismi">`,
      confirmButtonText: 'Güncelle',
      confirmButtonColor:"green",
      focusConfirm: false,
      showCancelButton:true,
      cancelButtonText:'İptal',
      cancelButtonColor:'red',
      preConfirm: () => {
        const colorName = (<HTMLInputElement> Swal.getPopup().querySelector('#colorName')).value
        if (!colorName ) {
          Swal.showValidationMessage(`Lütfen ismi doğru giriniz`)
        }
        return { colorName: colorName }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let color:Color = {id:colorId, name:result.value.colorName}

        this.colorService.update(color).subscribe(response =>{
                  if(response.success){
                    this.toasterService.success("Başarılı",response.message)
                    Swal.fire(`
                   Renk ${result.value.colorName} olarak güncellendi.
                  `.trim())
                  this.router.navigate(['', 'colors']);
                  }else{
                    location.reload()
                  }
        })
      }

    })
  }

  deleteColor(color:Color){
    Swal.fire({
      title: color.name +' adlı renk silinecek. Onaylıyor musunuz?',
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

        this.colorService.delete(color).subscribe(response =>{
                  if(response.success){
                    this.toasterService.success("Başarılı",response.message)
                  }else{
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: color.name +' silindi',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  this.toasterService.error("Hata",response.message)
                  this.router.navigate(['', 'colors']);
                  }
        })
      }

    })
  }

}
