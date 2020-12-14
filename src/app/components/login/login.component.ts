import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  customer: { email: string; password: string };
  remember: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    this.customer = { email: '', password: '' };
  }

  ngOnInit(): void {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      text: 'Please wait...',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    return this.loginService
      .logIn(this.customer.email, this.customer.password)
      .subscribe(
        (resp) => {
          // console.log('RESP: ', resp);
          Swal.close();
          this.router.navigateByUrl('/customers');
        },
        (error) => {
          // console.log('ERROR: ', error);

          Swal.fire({
            text: error.error.error,
            title: 'LogIn error',
            icon: 'error',
          });
        }
      );
  }
}
