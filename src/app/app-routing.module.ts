import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router'
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'products/:id', component:ProductsComponent},
    {path:'', redirectTo:'products/1',pathMatch:'full'}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
