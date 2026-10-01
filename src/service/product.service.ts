import fs from "fs";
import path from "path";

const filepath = path.join(process.cwd(), "./src/database/db.json");

export const readProduct=()=>{
  console.log("Reading product data from file:", filepath);
  const products=fs.readFileSync(filepath, "utf-8");
  console.log("Product data:", products);
  return JSON.parse(products);
}