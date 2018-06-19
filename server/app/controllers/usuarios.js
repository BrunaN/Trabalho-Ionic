let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let Usuario = require('../models/usuario.js');
let Post = require('../models/post.js');

module.exports.listaUsuarios = function(req, res){
    let promise = Usuario.find({}, {'senha': 0}).exec();
    promise.then(
        function(usuarios){
            res.status(200).json(usuarios);
        }
    ).catch(
        function(erro){
            res.status(500).send(erro);
        }
    )
}

module.exports.obterUsuario = function(req, res){
    let id = req.params.id;

    let promise = Usuario.findById(id).exec();
    promise.then(
        function(usuario){
            res.status(200).json({
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            });
        }
    ).catch(
        function(erro){
            res.status(404).send(erro);
        }
    )
};

module.exports.inserirUsuario = function(req, res){
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    });

    let promise = Usuario.create(usuario);
    promise.then(
        function(usuario){
            console.log("aqui")
            res.status(201).json({
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            });
        }
    ).catch(
        function(erro){
            res.status(500).json(erro);
        }
    )
}

module.exports.updateUsuario = function(req, res){
    let payload = jwt.decode(req.query.token);

    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        _id: payload.id
    });

    let promise = Usuario.findByIdAndUpdate(payload.id, usuario);
    promise.then(
        function(usuario){
            res.status(200).json({
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            });
        }
    ).catch(
        function(erro){
            res.status(500).json(erro);
        }
    )
}

module.exports.deleteUsuario = function(req, res){
    let payload = jwt.decode(req.query.token);

    let promise = Usuario.remove({'_id':payload.id});
    promise.then(
        function(usuario){
            res.status(200).send("Usuário removido");
        }
    ).catch(
        function(erro){
            res.status(500).json(erro);
        }
    )
}

module.exports.obterPostsDoUsuario = function(req, res){
    let id = req.params.id;
    
    let promise = Post.find({'usuario': id});
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