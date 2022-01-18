import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerForRegister } from 'src/app/models/customerForRegister';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStrorageService } from 'src/app/services/local-strorage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  findexScore:number = environment.findexScore
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private localStorageService:LocalStrorageService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
    });
  }
  register() {
    if (this.registerForm.valid) {
      let model = Object.assign({}, this.registerForm.value);

      if ( model.password == model.passwordAgain) {

        let customerForRegister: CustomerForRegister = {
          firstName: model.firstName,
          lastName: model.lastName,
          email: model.email,
          companyName: model.companyName,
          password: model.password,
          findexScore: this.findexScore
        };
        console.log(customerForRegister);
        this.authService.register(customerForRegister).subscribe(
          (response) => {
            this.toasterService.info(response.message, 'Müşteri Eklendi');
            this.localStorageService.setData<string>('token', response.data.token);

          },
          (responseError) => {
            console.log(responseError);
            this.toasterService.error(responseError.console.error,'Mesaj');
          }
        );
      }
      else{
        this.toasterService.error('Parolalar eşleşmiyor');
      }
    }
    else{
      this.toasterService.error('Formunuz eksik');
    }
  }
}
