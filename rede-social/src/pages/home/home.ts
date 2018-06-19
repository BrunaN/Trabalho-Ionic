import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage: any = SignupPage

  constructor(public navCtrl: NavController) {

  }

  toLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  toSigninPage(){
    this.navCtrl.push(SignupPage);
  }
}
