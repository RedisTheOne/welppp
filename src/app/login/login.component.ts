import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) { }

  existTrue:boolean = true;

  ngOnInit() {
    if(localStorage.getItem('TOKEN'))
      this.router.navigate(['juthapp/']);
  }

  toggleExist() {
    this.existTrue = !this.existTrue;
  }

  usernameFocused() {
    document.getElementById('usernameLabel').style.top = '-20px';
    this.passwordBlured();
    document.getElementById('usernameInput').focus();
    document.getElementById('usernameLabel').style.color = "rgba(211, 211, 211, 0.908)";
  }

  usernameBlured() {
    const username = (<HTMLInputElement>document.getElementById('usernameInput')).value;
    if(username.length === 0) {
      document.getElementById('usernameLabel').style.top = '5px';
      document.getElementById('usernameLabel').style.color = "white";
    }
  }

  emailFocused() {
    document.getElementById('emailLabel').style.top = '-20px';
    this.passwordBlured();
    document.getElementById('emailInput').focus();
    document.getElementById('emailLabel').style.color = "rgba(211, 211, 211, 0.908)";
  }

  emailBlured() {
    const email = (<HTMLInputElement>document.getElementById('emailInput')).value;
    if(email.length === 0) {
      document.getElementById('emailLabel').style.top = '5px';
      document.getElementById('emailLabel').style.color = "white";
    }
  }

  passwordFocused() {
    document.getElementById('passwordLabel').style.top = '-20px';
    document.getElementById('passwordInput').focus();
    document.getElementById('passwordLabel').style.color = "rgba(211, 211, 211, 0.808)";
    this.usernameBlured();
  }

  passwordBlured() {
    const password = (<HTMLInputElement>document.getElementById('passwordInput')).value;
    if(password.length === 0) {
      document.getElementById('passwordLabel').style.top = '5px';
      document.getElementById('passwordLabel').style.color = "white";
    }
  }

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      return (true)
    return (false)
  }

  formSubmited() {
    if(this.existTrue) {
      const username = (<HTMLInputElement>document.getElementById('usernameInput')).value;
      const password = (<HTMLInputElement>document.getElementById('passwordInput')).value;
  
      if(/\S/.test(username) && /\S/.test(password))
        this.loginService.login(username, password);
      else
        alert('Please fill required fields!');
    } else {
      const username = (<HTMLInputElement>document.getElementById('usernameInput')).value;
      const password = (<HTMLInputElement>document.getElementById('passwordInput')).value;
      const email = (<HTMLInputElement>document.getElementById('emailInput')).value;
      if(/\S/.test(username) && /\S/.test(password) && this.ValidateEmail(email))
        this.loginService.register(username, password, email);
      else
        alert('Please fill required fields!');
    }
  }

}
