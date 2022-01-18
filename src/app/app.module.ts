import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerListComponent } from './components/admin/customer-list/customer-list.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { AppRoutingModule } from './app-routing.module';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { RentalAddComponent } from './components/admin/rental-add/rental-add.component';
import { ColorListComponent } from './components/admin/color-list/color-list.component';
import { BrandListComponent } from './components/admin/brand-list/brand-list.component';
import { CarListComponent } from './components/admin/car-list/car-list.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { CarEditComponent } from './components/admin/car-edit/car-edit.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerListComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    ColorFilterPipe,
    BrandFilterPipe,
    CarFilterPipe,
    RentalAddComponent,
    ColorListComponent,
    BrandListComponent,
    CarListComponent,
    CarAddComponent,
    CarEditComponent,
    FooterComponent,
    SearchComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ProfileComponent,
    ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass :  AuthInterceptor,
      multi : true
    },
    {
      provide: JWT_OPTIONS,
      useValue :JWT_OPTIONS
    },
    JwtHelperService
],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
