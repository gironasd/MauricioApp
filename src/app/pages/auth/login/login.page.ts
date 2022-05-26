import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public loginForm = this.fb.group({
    email: ['saavedrad@gmail.com', [Validators.required, Validators.email] ],
    password: ['123456', Validators.required],
    remember: [false]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  login () {
    //console.log(this.loginForm.value)
    this.loginService.login( this.loginForm.value )
    .subscribe( resp => {
        console.log(resp)
        this.router.navigateByUrl('tabs/cuentas')
      })
  }

}
