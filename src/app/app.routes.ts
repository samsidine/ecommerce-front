import { Routes } from '@angular/router';
import {AdminsComponent} from "./admins/admins.component";

import {ProductComponent} from "./product/product.component";
import {UsersComponent} from "./users/users.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

function AuthenticationGuard() {

}

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: '', component: LoginComponent },
  {path: 'admin', component: AdminTemplateComponent, canActivate :[AuthenticationGuard],

    children : [
      {path: 'admins', component: AdminsComponent },
      {path: 'product', component: ProductComponent },
      {path: '', redirectTo: 'home',pathMatch: 'full'},
      {path: 'users',component:UsersComponent },
      {path: 'newProduct',component: NewProductComponent},
      {path: 'editProduct/:id',component: EditProductComponent },
    ]},

];
