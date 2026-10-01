import type { IncomingMessage, ServerResponse } from 'node:http';
import { readProduct } from '../service/product.service';

export const productController = (
	req: IncomingMessage,
	res: ServerResponse,
) => {
	const url = req.url;
	const method = req.method;

	if (url === '/products' && method === 'GET') {

// const products = [
//     { id: 1, name: 'Product 1', price: 10.99 },
//     { id: 2, name: 'Product 2', price: 19.99 },
//     { id: 3, name: 'Product 3', price: 5.99 },
//   ];
	const products = readProduct();

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'this is products route', data: products }));
	}
};
