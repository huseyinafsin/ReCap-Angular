import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './components/about/about.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { HomeComponent } from './components/home/home.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
    {path:"",pathMatch:"full",component:HomeComponent},
    {path:"home",pathMatch:"full",component:HomeComponent},
    {path:"about",component:AboutComponent},
    {path:"contact",component:ContactComponent},
    {path:"car",component:CarComponent},
    {path:"cars",component:CarListComponent},
    {path:"cars/edit/:id",component:CarEditComponent},
    {path:"cars/add",component:CarAddComponent},
    {path:"colors",component:ColorListComponent},
    {path:"brands",component:BrandListComponent},
    {path:"brand/:brandId",component:CarComponent},
    {path:"color/:colorId",component:CarComponent},
    {path:"cars/details/:carId",component:CarDetailComponent},
    {path:"brand/:brandId/color/:colorId",component:CarComponent},
    {path:"rentals",component:RentalComponent},
    {path:"rentals/rent/:id",component: RentalAddComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
