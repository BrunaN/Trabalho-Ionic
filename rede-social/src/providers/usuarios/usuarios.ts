import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class UsuariosProvider{

    url: string = "http://localhost:3000/api/usuarios";

    constructor(public http: Http) { }
    
    setToken(token){
        localStorage.setItem("token", token);
    }

    getToken(){
        return localStorage.getItem("token");
    }

    hasToken(){
        if(localStorage.getItem("token")){
            return localStorage.getItem("token");
        }
    }

    removeToken(){
        localStorage.removeItem("token");
    }

    login(email,senha){
        return this.http.post(this.url + "/signin",{
            email,
            senha
        }).map((response: Response) =>{
            let res =  response.json();
            console.log(res.token);
            this.setToken(res.token);
            return res
        })
    }

    insertUser(usuario){
        return this.http.post(this.url, usuario)
                        .map((response: Response) => {
                            let res = response.json();
                            return res;
                        }).catch((error: Response) => Observable.throw(error));
    }
}