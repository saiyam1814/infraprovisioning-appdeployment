const tform = require('express').Router({mergeParams: true});
const tcommands = require('./terraformcommands')
const bodyParser = require('body-parser');


tform.get('/', (req,res) =>{
    console.log(req.body)
    res.json({
        message: "Terraform..."
    })
});

tform.post('/', (req,res) =>{
    console.log(req.body, req.query)
    res.json({
        message: "Terraform..."
    })
});

tform.get('/tgetjson',tcommands.runscript);
tform.post('/initializetenancy', tcommands.initializescript)
tform.post('/getcluster', tcommands.getCluster)
tform.post('/tenacyDetails', tcommands.initializescript)
tform.post('/uploadppkfile', tcommands.uploadfile)



module.exports = tform;
