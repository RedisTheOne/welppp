import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../services/friends.service';

//Interfaces
interface DataInterface {
  status: Boolean;
  user: UserInterface;
  users: Array<UserInterface>; 
  msg: String;
}

interface UserInterface {
  friendRequests: Array<String>;
  friends: Array<String>;
  password: String;
  username: String;
}

interface FriendInterface {
  user: String;
  score:number;
  rank: String;
}

//Component
@Component({
  selector: 'app-login',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  constructor(private router: Router, private service: FriendsService) { }

  view: String = 'FRIENDS_LIST';
  title: String = '';
  notificationisVisible: Boolean = false;
  notificationBody: String = 'Loading...';
  username: String = '';

  friends: Array<FriendInterface> = [];
  users: Array<UserInterface> = [];
  usersToShow: Array<UserInterface> = [];
  loading: Boolean = true;
  friendRequests: Array<String> = [];

  returnFriendsSorted(friends: Array<FriendInterface>) {
    return friends.sort((a, b) => b.score - a.score);
  }
  
  searchInputKeyUp(e) {
    const value = e.target.value;
    if(value.length === 0)
      this.usersToShow = this.users;
    else 
      this.usersToShow = this.users.filter((u: UserInterface) => u.username.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
  }

  deleteFriend(e: String) {
    this.notificationBody = 'Friend Deleted';
    this.notificationisVisible = true;
    this.friends = this.friends.filter(f => f.user !== e);
    this.service.delteFriend(e, localStorage.getItem('TOKEN'))
      .subscribe(() => {});
  }

  backBtnClicked() {
    this.router.navigate(['juthapp/gigamarket']);
  }

  xButtonClicked() {
    this.notificationisVisible = false;
  }

  declineRequest(username: String) {
    this.notificationBody = 'Request declined';
    this.notificationisVisible = true;
    this.friendRequests = this.friendRequests.filter(u => u !== username);
    this.service.declineFriendRequest(username, localStorage.getItem('TOKEN'))
      .subscribe(() => {});
  }

  acceptRequest(username: String) {
    this.notificationBody = 'Request accepted';
    this.notificationisVisible = true;
    this.friendRequests = this.friendRequests.filter(u => u !== username);
    this.service.acceptFriendRequest(username, localStorage.getItem('TOKEN'))
      .subscribe(() => {});
    this.service.getFriendInfo(username)
      .subscribe((friend: FriendInterface) => {
        this.friends.push(friend)
        this.friends = this.returnFriendsSorted(this.friends);
      });
  }

  userToAddClicked(e: String) {
    this.notificationBody = 'Loading...';
    this.notificationisVisible = true;
    this.service.sendFriendRequest(e, localStorage.getItem('TOKEN'))
      .subscribe((data: DataInterface) => {
        this.notificationBody = data.msg;
        this.notificationisVisible = true; 
      })
  }

  ngOnInit() {
    if(!localStorage.getItem('TOKEN'))
      this.router.navigate(['juthapp/']);
    else {
      //Fetch friends, and info for every friend
      this.service.getUserinformation(localStorage.getItem('TOKEN'))
        .subscribe((data: DataInterface) => {
          //Set loading false and set the users
          this.loading = false;
          this.username =  data.user.username.charAt(0).toUpperCase() + data.user.username.slice(1);
          this.users = data.users.filter(u => u.username !== data.user.username && !data.user.friends.includes(u.username));
          this.usersToShow = this.users;
          this.title = `${this.username}'s friends`;
          this.friendRequests = data.user.friendRequests;
          //Fetch data for every individual friend, and push it
          data.user.friends.forEach(f => {
            this.service.getFriendInfo(f)
              .subscribe((friend: FriendInterface) => {
                this.friends.push(friend)
                this.friends = this.returnFriendsSorted(this.friends);
              });
          });
        });
    }
  }

  friendsListButtonClicked() {
    document.querySelectorAll('.bottom-tabs div').forEach(d => d.classList.remove('active'));
    document.getElementById('friendsList').classList.add('active');
    this.view = 'FRIENDS_LIST';
    this.title = `${this.username}'s friends`;
  }

  addFriendButtonClicked() {
    document.querySelectorAll('.bottom-tabs div').forEach(d => d.classList.remove('active'));
    document.getElementById('addFriend').classList.add('active');
    this.view = 'ADD_FRIEND';
    this.title = 'Add a friend';
  }

  friendReqetsButtonClicked() {
    document.querySelectorAll('.bottom-tabs div').forEach(d => d.classList.remove('active'));
    document.getElementById('friendRequests').classList.add('active');
    this.view = 'FRIEND_REQUESTS';
    this.title = `${this.username}'s friend requests`;
  }
}
