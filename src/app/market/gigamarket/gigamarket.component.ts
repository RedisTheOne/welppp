import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { GigamarketService } from '../../services/gigamarket.service';

interface leaderbordInterface {
  user: String;
  score: Number;
  rank: String;
}

interface DataInterface {
  status: Boolean;
  data: Array<leaderbordInterface>;
}

@Component({
  selector: 'app-gigamarket',
  templateUrl: './gigamarket.component.html',
  styleUrls: ['./gigamarket.component.scss'],
})
export class GigamarketComponent implements OnInit {

  constructor(private router: Router, private service: GigamarketService) { }

  ngOnInit() {
    this.service.getLeaderboardUsers()
      .subscribe((data: DataInterface) => {
        this.leaderboardScores = data.data
      });
  }

  leaderboardScores: Array<leaderbordInterface> = []

  tabLocation:number = 1;

  rippleColor: string = 'white';

  goJuth() {
    this.router.navigate(['/juthapp']);
  }

  goInfo() {
    this.router.navigate(['/juthapp/gigamarket/info']);
  }

  changeTab(tabLoc) {
    document.querySelectorAll('.tab-button').forEach(c => c.classList.remove('active'));
    document.getElementById(`butt${tabLoc}`).classList.add('active');
    this.tabLocation = tabLoc;
  }

  animate(catNo) {
    document.querySelectorAll('.category').forEach(c => c.classList.remove('active-butt'));
    document.getElementById(`category${catNo}`).classList.add('active-butt');

    this.router.navigate(['/juthapp/gigamarket/buy']);
  }

  goFriends() {
    this.router.navigate(['/juthapp/friends']);
  }

  //Redus Code
  tabBarClicked(id: String) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('activeTab'));
    document.getElementById(`${id}Tab`).classList.add('activeTab');
  }
}
