import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStrorageService } from 'src/app/services/local-strorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private toastrService:ToastrService,
              private localStorageService:LocalStrorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email :["",Validators.required],
      password :["", Validators.required]
    })
  }
  login(){

    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response =>{
        this.toastrService.info(response.message,"Mesaj")
        this.localStorageService.setData("token",response.data.token)
      },responseError =>{
        console.log(responseError)
        this.toastrService.error(responseError.console.error, "Mesaj");

      })
    }
  }

}
