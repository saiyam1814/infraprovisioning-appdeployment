const oracleApis = require('express').Router();
const apisfunction = require('./api_function')

// oracleApis.get('/', (req,res) =>{
//     res.json({
//         message: "Oracle APIS Connected"
//     })
// });

//oracleApis.get('/getall1', [apisfunction.getall1, apisfunction.getall2]);




module.exports = oracleApis;
