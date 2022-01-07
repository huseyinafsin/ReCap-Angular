import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStrorageService } from 'src/app/services/local-strorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
    });
  }
  register() {
    if (this.registerForm.valid) {
      let model = Object.assign({}, this.registerForm.value);

      if ( model.password == model.passwordAgain) {

        let registerModel: RegisterModel = {
          firstName: model.firstName,
          lastName: model.lastName,
          email: model.email,
          password: model.password,
        };
        console.log(registerModel);
        this.authService.register(registerModel).subscribe(
          (response) => {
            this.toasterService.info(response.message, 'Kullanıcı Eklendi');
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
