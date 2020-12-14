import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'customer/:id',
    component: CustomerComponent,
    canActivate: [LoginGuard],
    data: { roles: ['ADMIN_ROLE'] },
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
