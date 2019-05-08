const upload = require('express').Router();
const gitupload = require('./git_upload')

upload.get('/', (req,res) =>{
    res.json({
        message: "Project Uploading..."
    })
});

upload.get('/gitupload',gitupload.runscript);




module.exports = upload;
