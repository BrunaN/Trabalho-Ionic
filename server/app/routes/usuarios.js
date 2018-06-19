let controller = require('../controllers/usuarios');
let auth = require('../controllers/auth')

module.exports = function(app){
    app.post('/api/usuarios/signin', auth.signin);
    app.post('/api/usuarios', controller.inserirUsuario);
    app.use('/api/usuarios', auth.verificarToken);
    app.get('/api/usuarios', controller.listaUsuarios);
    app.get('/api/usuarios/:id', controller.obterUsuario);
    app.put('/api/usuarios', controller.updateUsuario);
    app.delete('/api/usuarios', controller.deleteUsuario);
    app.get('/api/usuarios/:id/posts', controller.obterPostsDoUsuario);
}