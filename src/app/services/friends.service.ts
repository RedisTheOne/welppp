import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) {}

  //Fetch User information
  getUserinformation(TOKEN) {
    const headerDict = {
      'Authorization': `Bearer ${TOKEN}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    return this.http.get('https://juthappapi.herokuapp.com/friends', requestOptions);
  }

  //Fetch Friend info
  getFriendInfo(name: String) {
    return this.http.get('http://juthappapi.herokuapp.com/scores/structured/user/' + name);
  }

  //Send Friend Request
  sendFriendRequest(name: String, TOKEN: String) {
    const headerDict = {
      'Authorization': `Bearer ${TOKEN}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    const data = {
      "friendUsername": name
    }
    return this.http.post('http://juthappapi.herokuapp.com/friends/send/request', data, requestOptions);
  }

  //Accept Friend Request
  acceptFriendRequest(name: String, TOKEN: String) {
    const headerDict = {
      'Authorization': `Bearer ${TOKEN}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    const data = {
      "friendUsername": name
    }
    return this.http.post('http://juthappapi.herokuapp.com/friends/accept/request', data, requestOptions);
  }

  //decline Friend Request
  declineFriendRequest(name: String, TOKEN: String) {
    const headerDict = {
      'Authorization': `Bearer ${TOKEN}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    const data = {
      "friendUsername": name
    }
    return this.http.post('http://juthappapi.herokuapp.com/friends/cancel/request', data, requestOptions);
  }

  //Delte Friend
  delteFriend(name: String, TOKEN: String) {
    const headerDict = {
      'Authorization': `Bearer ${TOKEN}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    const data = {
      "friendUsername": name
    }
    return this.http.post('http://juthappapi.herokuapp.com/friends/delete/friend', data, requestOptions);
  }
}
