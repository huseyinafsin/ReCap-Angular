import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
    {path:"",pathMatch:"full",component:CarComponent},
    {path:"cars",component:CarComponent},
    {path:"cars/brand/:brandId",component:CarComponent},
    {path:"cars/color/:colorId",component:CarComponent},
    {path:"cars/details/:carId",component:CarDetailComponent},
    {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
    {path:"rentals",component:RentalComponent},
    {path:"rentals/rent/:id",component: RentalAddComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
