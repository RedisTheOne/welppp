import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FriendsComponent } from './friends.component';

import { FriendsRoutingModule } from './friends-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsRoutingModule
  ],
  declarations: [FriendsComponent]
})
export class FriendsModule {}
