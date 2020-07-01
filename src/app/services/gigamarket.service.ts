import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GigamarketService {

  constructor(private http: HttpClient) { }

  //Get All TIme Scores
  getLeaderboardUsers() {
    return this.http.get('https://juthappapi.herokuapp.com/scores/structured/all-time');
  }
}