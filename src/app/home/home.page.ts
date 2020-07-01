import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  isActive:boolean = false;

  goMarket() {
    this.router.navigate(['juthapp/gigamarket']);
  }

  activate() {
    if(this.isActive == false) {
      document.getElementById('round').classList.remove('inactive');
      document.getElementById('round').classList.add('activated');

      document.getElementById('preview').classList.remove('exit');
      document.getElementById('preview').classList.add('enter');
    } else {
      document.getElementById('round').classList.remove('activated');
      document.getElementById('round').classList.add('inactive');

      document.getElementById('preview').classList.remove('enter');
      document.getElementById('preview').classList.add('exit');
    }
    
    this.isActive = !this.isActive;
  }
}
