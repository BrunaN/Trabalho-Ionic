let jwt = require('jsonwebtoken');

let Post = require('../models/post.js');

module.exports.listaPosts = function(req, res){
    let promise = Post.find().populate('usuario', '-senha').exec();
    promise.then(
        function(posts){
            res.status(200).json(posts);
        }
    ).catch(
        function(erro){
            res.status(500).send(erro);
        }
    )
}

module.exports.obterPost = function(req, res){
    let id = req.params.id;

    let promise = Post.findById(id);
    promise.then(
        function(post){
            res.status(200).json(post);
        }
    ).catch(
        function(erro){
            res.status(404).send('Post não encontrado');
        }
    )
};

module.exports.inserirPost = function(req, res){
    let payload = jwt.decode(req.query.token);

    let post = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        usuario: payload.id
    });

    let promise = Post.create(post);
    promise.then(
        function(post){
            let promise1 = Post.findById(post._id).populate('usuario', '-senha').exec();
            promise1.then(
                function(p){
                    res.status(201).json(p);
                }
            ).catch(
                function(erro){
                    res.status(500).send(erro);
                }
            )
            
        }
    ).catch(
        function(erro){
            res.status(500).send(erro);
        }
    )
}

module.exports.updatePost = function(req, res){
    let id = req.params.id;

    let post_updated = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        usuario: req.body.usuario,
        _id: id
    });

    let payload = jwt.decode(req.query.token);

    let promise = Post.findById(id);
    promise.then(
        function(post){
            if(req.body.usuario == payload.id){
                let promise1 = Post.findByIdAndUpdate(post.id, post_updated)
                promise1.then(
                    function(post){
                        res.status(200).json("Post updated");
                    }
                ).catch(
                    function(erro){
                        res.status(500).send(erro);
                    }
                )
            }else{
                res.status(500).json("user invalid");    
            };
        }
    ).catch(
        function(erro){
            res.status(500).send(erro);
        }
    )
}

module.exports.deletePost = function(req, res){
    let id = req.params.id;

    let payload = jwt.decode(req.query.token);

    let promise = Post.findById(id).exec();
    promise.then(
        function(post){
            if(post.user == payload.id){
                let promise1 = Post.remove({'_id': id}).exec()
                promise1.then(
                    function(post_remove){
                        res.status(200).json("Post removed");
                    }
                ).catch(
                    function(erro){
                        res.status(500).send(erro);
                    }
                )
            }else{
                res.status(500).json("user invalid");
            }
        }
    ).catch(
        function(error){
            res.status(500).json("user invalid 2");
        }
    )
}

module.exports.usuarioPost = function(req, res){
    let id = req.params.id;

    let promise = Post.findById(id)
                        .populate('usuario', '-senha').exec();
    promise.then(
        function(post){
            res.json(post.usuario);
        }
    ).catch(
        function(erro){
            res.status(500).send(erro);
        }
    )
}