import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Include components for in which router service to be used
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'view-customers', component: CustomerListComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
