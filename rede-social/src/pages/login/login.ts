import { TimelinePage } from './../timeline/timeline';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuariosProvider: UsuariosProvider) {
  }

  login(email, senha){
    this.usuariosProvider.login(email, senha)
                          .subscribe(
                            data => {
                              this.navCtrl.setRoot(TimelinePage);
                            }, error => {
                              console.log(error);
                            }
                          )
  }

}
