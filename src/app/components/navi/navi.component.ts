import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStrorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private localStorageService:LocalStrorageService,
              private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password :['', Validators.required]
    })
  }

  login(){

    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response =>{
        this.localStorageService.setData("token",response.data.token)
      },responseError =>{
        console.log(responseError)
        this.toasterService.error(responseError.console.error, "Mesaj");
      })
    }
  }
}
