const {
  findAll,
  find,
  pushProduct,
  update,
} = require("../Model/ProductsModel");
const { writeDataToFile, getPostProduct } = require("../utils");

// @Method to get all products
async function getProducts(req, res) {
  try {
    const products = await findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (e) {
    console.log(e);
  }
}
//@Method to get a single product
async function getProduct(req, res, id) {
  try {
    const product = await find(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (e) {
    console.log(e);
  }
}
async function createProduct(req, res) {
  try {
    let body = await getPostProduct(req);
    const { name, description } = JSON.parse(body);
    const product = {
      name,
      description,
    };
    const newProduct = await pushProduct(product);
    writeDataToFile("./data/products.json", JSON.stringify(newProduct));
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (e) {
    console.log(e);
  }
}
async function updateProduct(req, res, id) {
  let product = await find(id);
  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "The product not found" }));
  } else {
    let body = await getPostProduct(req);
    const { name, description } = JSON.parse(body);
    const productData = {
      name: name || product.name,
      description: description || product.description,
    };
    const updProduct = await update(productData, id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "The product success update",
        data: updProduct,
      })
    );
  }
}
async function deleteProduct(req, res, id)
{
  let product = await find(id)
  if(!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "The product not found" }));
  } else {
    let products = await findAll()
    products = products.filter((p) => p.id != id)
    writeDataToFile("./data/products.json", JSON.stringify(products));
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({"message" : "succses deleted", "data" : product}));
  }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
