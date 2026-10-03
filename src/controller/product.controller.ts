import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts=url?.split("/") || [];
  console.log("urlParts", urlParts);
  const id= urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  console.log("id", id);

  //Get all products
  if (url === "/products" && method === "GET") {
    // const products = [
    //     { id: 1, name: 'Product 1', price: 10.99 },
    //     { id: 2, name: 'Product 2', price: 19.99 },
    //     { id: 3, name: 'Product 3', price: 5.99 },
    //   ];
    const products = readProduct(); //[{},{},{}]

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "this is products route", data: products }),
    );
  } else if (method ==="GET" && id!== null) { //GET single product by ID
    // Get a specific product by ID
   const products = readProduct();
   const product = products.find((p: IProduct) => p.id === id);
   
   console.log("product", product);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "products retrive successfully", data: products }),
    );
  } else if (method === "POST" && url === "/products") {
	//created product by Post method 
	const body =await parseBody(req);
	console.log("body", body);
const products = readProduct();
const newProduct ={
	id:Date.now(),
	...body,
}
products.push(newProduct);
console.log("products", products);
insertProduct(products);  //[{},{},{},{newProduct}]

	res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: " products retrive successfully ",
		 data: products,
		}),
    );
  } else if (method === "PUT" && id !== null) {
	//update product by PUT method 
	const body =await parseBody(req);
	const products =readProduct();
	const index = products.findIndex((p: IProduct) => p.id === id);
	console.log("productIndex", index);
	

	if(index<0){
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(
		  JSON.stringify({ message: "Product not found", data: null }),
		);
		return;
	}
	products[index] = {id: products[index].id, ...body};
	insertProduct(products);
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
	  JSON.stringify({ message: " products updated successfully ",
		 data: products[index],
		}),
	);
  }

};
