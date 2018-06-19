import { HomePage } from './../home/home';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { PostsProvider } from './../../providers/posts/posts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  
  usuario = this.usuariosProvider.getToken();

  posts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public postProvider: PostsProvider, public usuariosProvider: UsuariosProvider) {

    this.postProvider.buscarPost(this.usuario)
      .subscribe(
        data => {
          this.posts = data;
        }, error => {
          console.log(error);
        }
      )
  }

  postar(texto){
    let post = {'texto': texto};
    this.postProvider.inserirPost(post, this.usuario)
      .subscribe(
        data => {
          this.posts.push(data);
        }, error => {
          console.log(error);
        }
      )
  }

  logout(){
    this.usuariosProvider.removeToken();
    if(!this.usuariosProvider.hasToken()){
      this.navCtrl.setRoot(HomePage);
    }
  }
}
