import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { MessageComponent } from './message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    CustomerComponent,
    CustomersComponent,
    MessageComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class ComponentsModule {}
