const products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid');



function findAll(){
    return new Promise((resolve,reject)=>{
        resolve(products)
    })
}
function find(id){
    return new Promise((resolve,reject)=>{
       const product = products.find((p)=> p.id === parseInt(id))
       resolve(product)
    })
}
function pushProduct(product)
{
    const newProduct = {id: uuidv4(),...product}
    products.push(newProduct)
    return new  Promise((resolve,reject)=>{
        resolve(products)
    })
}
function update(product, id)
{
    let index = products.findIndex((p) => p.id == id)
    products[index] = {id , ...product }
    return new  Promise((resolve,reject)=>{
        resolve(products[index])
    })
}


module.exports = {findAll,find, pushProduct, update}