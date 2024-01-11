const http = require('http');
const routes = require('./routes');
const { URL } = require('url');
const server = http.createServer((request,response) => { 
const bodyParser = require('./helpers/bodyparser');
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);

    console.log('Request method: ', request.method, ' | Endpoint: ', request.url);

    // get path from current url
    let { pathname } = parsedUrl;
    let id = null;

    // split path by '/'
    const splitEndpoint = pathname.split('/').filter(Boolean);
    // filter(Boolean) removes empty strings from array 
    console.log(splitEndpoint);
    
    // if the splitted string has more than one substring, there is an id
    if (splitEndpoint.length > 1) {

        /* the pathname will be the first substring of splitEndpoint, and the id will be the second */
        pathname = `/${splitEndpoint[0]}/:id`;
        id = splitEndpoint[1];
    }
    // Will search route that matches desired request url and method. 
    const route = routes.find((routeObj) => (
        routeObj.endpoint === pathname && routeObj.method === request.method
    ));
    // if route exists
    if (route) {
        request.query = Object.fromEntries(parsedUrl.searchParams);
        request.params = { id };
        response.send = (statusCode,body ) => {
            response.writeHead(statusCode, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(body));
        }
        if (request.method === 'POST' || request.method === 'PUT') {    
            bodyParser(request, () => route.handler(request, response));
        }
        else {
            route.handler(request, response);
        }

        route.handler(request, response);
    }
    // else: 404 handling
    else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
    }

});
server.listen(3000, () => console.log('Server started at http://localhost:3000'));