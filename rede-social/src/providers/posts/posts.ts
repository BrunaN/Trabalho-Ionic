import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class PostsProvider{

    url: string = "http://localhost:3000/api/posts";

    posts = [];

    constructor(public http: Http) { }

    inserirPost(post, usuario){
        console.log(usuario)
        return this.http.post(this.url + "?token=" + usuario, post)
        .map((response: Response) => {
            let res = response.json();
            return res;
        });
    }

    buscarPost(usuario){
        console.log(usuario)
        return this.http.get(this.url + "?token=" + usuario)
        .map((response: Response) => {
            this.posts = [];
            for(let post of response.json()){
                console.log(post)
                this.posts.push(post);
            }
            return this.posts;
        });
    }
}