let users = require('../mocks/users');
module.exports = {
    listUsers(request, response) {
        const { order } = request.query;
        const sortedUsers = users.sort((a, b) => {
            if ( order === 'desc' ) {
                return a.id < b.id ? 1 : -1;
            }
            return a.id > b.id ? 1 : -1;
        });

        //200 success code 
        console.log(request.query);
        response.send(200, sortedUsers);


    },
    getUserById(request, response) {
        // make the id available in request.params
        const { id } = request.params;

        // Number() seria como um "atoi" do c
        const user = users.find((user) => user.id === Number(id));
        
        // check to see if user exists 
        if (!user) {
            return response.send(400, { error: 'User not found' });
        }
        
        response.send(200, user);
            
    },

    createUser(request, response) {
        const { body } = request;
        
        const lastUserId = users[users.length - 1].id;
            
        const newUser = {
            id: lastUserId + 1,
            name: body.name,
        };

        users.push(newUser);

        response.send(200, newUser);
    },
    updateUser(request, response) {
        let { id } = request.params;
        const { name } = request.body;
        id = Number(id);
        const userExists = users.find((user) => user.id === id);
        if (!userExists) {
            return response.send(400, { error: 'User not found' });
        }

        /* Use the map function to iterate over the users array, and when the user id matches the id in the request, return a new user object with the updated name. */

        users = users.map((user) => {
            if (user.id === id) {
                return {

                    /* Use the spread operator to copy the user object and update the user name */

                    ...user,
                    name,
                };
            }
            return user;
        });
        response.send (200, { id, name });

    },
    
}