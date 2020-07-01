import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GigamarketComponent } from './gigamarket.component';

const routes: Routes = [
  {
    path: '',
    component: GigamarketComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GigamarketRoutingModule {}
