const { request } = require('http');
const UserController = require('./controllers/usercontroller');
module.exports = [
    {
        endpoint: '/users',
        method : 'GET',
        handler: UserController.listUsers, //nao executa a funcao apenas chama sua referencia
        
    },
    {
        endpoint: '/users/:id',
        method : 'GET',
        handler: UserController.getUserById
    },
    {
        endpoint: '/users',
        method : 'POST',
        handler: UserController.createUser,
    },
    
]

// routes[0].handler(request, response); //executa a funcao