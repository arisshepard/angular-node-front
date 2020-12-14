import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: [],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    public loginService: LoginService
  ) {
    this.customerService.getCustomers().subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
        this.loading = false;
      },
      (err) => {
        // console.log('LOAD CUSTOMERS ERROR: ', err);

        Swal.fire({
          text: err.error.error,
          title: 'Customers',
          icon: 'error',
        });

        this.router.navigateByUrl('/login');
      }
    );
  }

  ngOnInit(): void {}

  deleteCustomer(customer: Customer): void {
    Swal.fire({
      title: 'Delete customer',
      text: `Are you sure you want to delete ${customer.firstname}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(
      (respuesta) => {
        if (respuesta.value) {
          const index = this.customers.indexOf(customer);
          this.customerService.deleteCustomer(customer.id).subscribe(() => {
            this.customers.splice(index, 1);
            Swal.fire({
              title: 'Delete customer',
              text: 'Customer deleted correctly',
              icon: 'success',
            });
          });
        }
      },
      (err) => {
        Swal.fire({
          text: err.error.error,
          title: 'Customers',
          icon: 'error',
        });

        this.router.navigateByUrl('/login');
      }
    );
  }

  signOut(): void {
    this.loginService.logOut();
    this.router.navigateByUrl('/login');
  }
}
