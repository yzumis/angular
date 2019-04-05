import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: '', component: MainComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}