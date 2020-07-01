import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GigamarketComponent } from './gigamarket.component';

import { GigamarketRoutingModule } from './gigamarket-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GigamarketRoutingModule
  ],
  declarations: [GigamarketComponent]
})
export class GigamarketModule {}
