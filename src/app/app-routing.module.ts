import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
    {path:"",pathMatch:"full",component:CarComponent},
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
    {path:"login",component: LoginComponent},
    {path:"register",component: RegisterComponent}

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
