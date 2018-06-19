import { LoginPage } from './../login/login';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioProvider: UsuariosProvider) {
  }

  signin(nome, email, senha){
    let usuario = {'nome': nome, 'email': email, 'senha': senha};
    this.usuarioProvider.insertUser(usuario)
                        .subscribe(
                          data => {
                            console.log(data);
                            this.navCtrl.setRoot(LoginPage);
                          }, error => {
                            console.log(error);
                          }
                        )
  }

}
