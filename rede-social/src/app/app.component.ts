import { HomePage } from './../pages/home/home';
import { UsuariosProvider } from './../providers/usuarios/usuarios';
import { TimelinePage } from './../pages/timeline/timeline';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public usuariosProvider: UsuariosProvider) {
    if(this.usuariosProvider.hasToken()){
      this.rootPage = TimelinePage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  
}