import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<Customer> {
    const customerTemp = { ...customer };

    delete customerTemp.id;

    return this.http
      .post<Customer>(`${environment.URL}/customer/create`, customerTemp)
      .pipe(
        map((resp: any) => {
          const customerResp: Customer = {
            firstname: resp.customer.firstname,
            lastname: resp.customer.lastname,
            age: resp.customer.age,
            address: resp.customer.address,
            id: resp.customer._id,
          };

          return customerResp;
        })
      );
  }

  getCustomer(id: string | number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.URL}/customer/${id}`).pipe(
      map((resp: any) => {
        const customer: Customer = {
          firstname: resp.customer.firstname,
          lastname: resp.customer.lastname,
          age: resp.customer.age,
          address: resp.customer.address,
          id: resp.customer._id,
        };

        return customer;
      })
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${environment.URL}/customer/retrieveinfos`)
      .pipe(
        map((resp: any) => {
          return resp.customers;
        }),
        map((customers) => {
          return customers.map((customer: any) => {
            const cust: Customer = {
              firstname: customer.firstname,
              lastname: customer.lastname,
              age: customer.age,
              address: customer.address,
              id: customer._id,
            };

            return cust;
          });
        })
      );
  }

  deleteCustomer(id: number | string): Observable<any> {
    return this.http.delete(`${environment.URL}/customer/deletebyid/${id}`);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const customerTemp = { ...customer };

    delete customerTemp.id;

    return this.http
      .put<Customer>(
        `${environment.URL}/customer/updatebyid/${customer.id}`,
        customerTemp
      )
      .pipe(
        map((resp: any) => {
          const customerResp: Customer = {
            firstname: resp.customer.firstname,
            lastname: resp.customer.lastname,
            age: resp.customer.age,
            address: resp.customer.address,
            id: resp.customer._id,
          };

          return customerResp;
        })
      );
  }
}
