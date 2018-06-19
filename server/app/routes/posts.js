let controller = require('../controllers/posts');
let auth = require('../controllers/auth');

module.exports = function(app){
    app.use('/api/posts/', auth.verificarToken);
    app.get('/api/posts', controller.listaPosts);
    app.get('/api/posts/:id', controller.obterPost);
    app.post('/api/posts', controller.inserirPost);
    app.put('/api/posts/:id', controller.updatePost);
    app.delete('/api/posts/:id', controller.deletePost);
    app.get('/api/posts/:id/usuario', controller.usuarioPost);
}