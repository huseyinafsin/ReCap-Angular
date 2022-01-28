import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { User } from 'src/app/models/user';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser :UserForLogin
  customerDetail: CustomerDetail;
  profileForm: FormGroup;
  findexScore: number = environment.findexScore;

  constructor(private formBuilder: FormBuilder,
              private toasterService :ToastrService,
              private customerService: CustomerService,
              private authService : AuthService,
              private userService : UserService) {}

  ngOnInit(): void {
    this.createProfileForm();
    this.getCurrentUser();
    this.getCarWithDetails(this.currentUser.email);
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
      findexScore: [''],
    });
  }

  onEditProfile() {
    if (this.profileForm.valid) {
      let customerModel = Object.assign( {},this.profileForm.value );
      if(customerModel.password ===customerModel.passwordAgain){
        let user: User = {
                id:this.customerDetail.customerId,
                email: customerModel.email,
                firstName: customerModel.companyName,
                lastName: customerModel.lastName,
                password : customerModel.password,
        };
        let userResult:boolean
        this.userService.update(user).subscribe(response=>{
            userResult = response.success
        })

        let customer:Customer ={
          id:this.customerDetail.customerId,
          findexScore: this.customerDetail.findexScore,
          userId : this.customerDetail.userId,
          companyName : this.customerDetail.companyName
        }

        let customerResult:boolean
        this.customerService.update(customer).subscribe(response=>{
            customerResult = response.success;
        })

        if (userResult && userResult) {
          this.toasterService.success("Profiliniz Güncellendi")
        } else {
          this.toasterService.error("Profiliniz Güncellenmedi", "Hata")
        }
      }

    }
    else{
      this.toasterService.error("Form Eksik")
    }
  }

  getCarWithDetails(email:string){
    this.customerService.getDetailsByMail(email).subscribe(response =>{
      this.customerDetail = response.data;
    })
  }

  getCurrentUser(){
   this.currentUser = this.authService.getUser()
  }
}
