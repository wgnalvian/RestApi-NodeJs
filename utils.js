const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');


function writeDataToFile(path, data)
{
    fs.writeFileSync(path,data,(e)=>console.log(e))
}
function getPostProduct(req)
{
    return new Promise((resolve,reject)=>{

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        })
        req.on("end", () => {
            
                resolve(body)
            
        })
    })
      
      
}


module.exports = {writeDataToFile, getPostProduct}