import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStrorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  loginForm:FormGroup;
  isLoggedIn: Observable<boolean>;
  isAdmin: boolean;
  currentUser:UserForLogin

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private localStorageService:LocalStrorageService,
              private toasterService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.getCurrentUser();
      this.checkifAdmin();
    })
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
      console.log(loginModel)
      this.authService.login(loginModel).subscribe(response =>{
        this.localStorageService.setData<string>("token",response.data.token)
        this.currentUser = this.authService.getUser()
        window.location.reload();
      },responseError =>{
        console.log(responseError)
        this.toasterService.error(responseError.console.error, "Mesaj");
      })
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate([""])
    this.toasterService.success("Hesabınızdan çıkış yapıldı", "Çıkış yapıldı");
    window.location.reload();
  }

  checkifAdmin() {
    if (this.authService.isLoggedIn) {
      this.isAdmin = this.authService.hasRole(this.currentUser, "admin");
    } else {
      this.isAdmin = undefined!;
    }
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser();
  }
}
