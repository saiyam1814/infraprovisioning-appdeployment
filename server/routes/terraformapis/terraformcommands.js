var shell = require('shelljs');
var fs = require('fs');
var config = require('../../config.json')
var multer = require('multer')


if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}



function runscript(req, res, next) {

    console.log(req.query.reponame)

    if (fs.existsSync('./gitfolder')) {
        // Do something
        console.log(true)
        shell.rm('-rf', './gitfolder')
    }
    shell.exec(`git clone ${req.query.reponame} ./gitfolder`, function (code, stderr, stdout) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        if (code !== 0) {
            res
                .status(400)
                .json({
                    "message": stderr
                })

        }
        else {
            res
                .status(200)
                .json({
                    "message": 'Success'
                })
        }
    });


}

function initializescript(req, res, next) {

  //  fs.readFile('./terraform/terraform.tfvars', (err, data) => {
       // if (err) throw err;
        let tenancyobj = req.body.development;
        // let newTenancy = JSON.parse(data);
        // let newTenancyDevelopment = newTenancy.development
        // newTenancyDevelopment.tenancyId = tenancyobj.tenancyId
        // newTenancyDevelopment.authUserId = tenancyobj.authUserId
        // newTenancyDevelopment.keyFingerprint = tenancyobj.keyFingerprint
        // newTenancyDevelopment.privateKeyPath = tenancyobj.privateKeyPath


        // newTenancy = JSON.stringify(newTenancy);  
        data = `tenancy_ocid="${tenancyobj.tenancyId}"
user_ocid="${tenancyobj.authUserId}"
fingerprint="${tenancyobj.keyFingerprint}"
compartment_id="${tenancyobj.democompartmentId}"
private_key_path="C:/Users/thrshett/.oci/oke_asset_key.pem"
region="us-ashburn-1"`

        fs.writeFileSync('./terraform/terraform.tfvars', data);
        res.json(data)

 //   })
}

function getCluster(req, res, next) {

    shell.cd('./terraform')
    let commands = ['terraform init', 'terraform plan', 'terraform apply']
    shell.exec('terraform init', function (code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        if (code == 0) {
            shell.exec('terraform plan', function (code, stdout, stderr) {
                console.log('Exit code:', code);
                console.log('Program output:', stdout);
                console.log('Program stderr:', stderr);
                if (code == 0) {
                    shell.exec('terraform apply', function (code, stdout, stderr) {
                        console.log('Exit code:', code);
                        console.log('Program output:', stdout);
                        console.log('Program stderr:', stderr);
                        if (code == 0) {
                            shell.exec('terraform output -json > clusters.json', function (code, stdout, stderr) {
                                console.log('Exit code:', code);
                                console.log('Program output:', stdout);
                                console.log('Program stderr:', stderr);
                                if (code == 0) {
                                    fs.readFile('./clusters.json', (err, data) => {
                                        console.log(data)
                                        let clusters = JSON.parse(data);
                                        res.status(200)
                                            .json(clusters)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

}

function uploadfile(req, res, next) {
    //save th e file to disk
 console.log("req.boyyyyyyyyy",req);
    // var apikeystorage = multer.diskStorage({
    //     destination: 'oci/',
    //     filename: function (req, file, cb) {
    //       cb(null, file.originalname)
    //     }
    //    } )
    // var uploadapikey = multer({ storage: apikeystorage })
   

   
}
module.exports = {

    runscript,
    initializescript,
    getCluster,
    uploadfile

}
