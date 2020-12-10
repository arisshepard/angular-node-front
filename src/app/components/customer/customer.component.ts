import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: [],
})
export class CustomerComponent implements OnInit {
  public customer: Customer = {
    firstname: '',
    lastname: '',
    age: 0,
    address: '',
  };

  form: FormGroup;

  title: string;
  action: string = 'Submit';

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const customerId = this.router.snapshot.paramMap.get('id');

    if (customerId !== 'new') {
      this.customerService.getCustomer(customerId).subscribe((customer) => {
        this.customer = customer;
        this.title = `${this.customer.firstname} ${this.customer.lastname}`;
        this.form.setValue(customer);
        this.action = 'Update';
      });
    } else {
      this.title = 'new customer';
    }
  }

  invalidField(name: string): boolean {
    return this.form.get(name).invalid && this.form.get(name).touched;
  }

  private createForm() {
    this.form = this.fb.group({
      id: [''],
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      age: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
    });

    this.form.controls.id.disable();
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) =>
        control.markAllAsTouched()
      );

      return;
    }

    Swal.fire({
      title: 'Please wait',
      text: 'Saving customer',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let request: Observable<any>;

    if (this.form.get('id').value) {
      request = this.customerService.updateCustomer(this.form.getRawValue());
    } else {
      request = this.customerService.createCustomer(this.form.getRawValue());
    }

    request.subscribe((customer: Customer) => {
      this.customer = customer;
      this.form.setValue(customer);
      this.title = `${this.customer.firstname} ${this.customer.lastname}`;

      this.action = 'Update';

      Swal.fire({
        title: this.title,
        text: 'Customer saved correctly',
        icon: 'success',
      });
    });
  }
}
