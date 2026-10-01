import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
	// console.log(req.url); //'/', '/users', '/users/1', etc.
	// console.log(req.method); // 'GET', 'POST', 'PUT', 'DELETE', etc.

	if (req.url === '/' && req.method === 'GET') {
		console.log('GET request to /');
		// res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.writeHead(200, { 'Content-Type': 'application/json' }); //Only status code and headers
		// res.end('this is root route');
		res.end(JSON.stringify({ message: 'this is root route' })); //server the ekono req/res client e pathaile string/buffer e pathaite hbe
	} else if (req.url?.startsWith('/products')) {
		productController(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
};