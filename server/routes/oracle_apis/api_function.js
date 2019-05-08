var auth = require('../../config.json')
var fs = require('fs');
var https = require('https');
var os = require('os');
var httpSignature = require('http-signature');
var jsSHA = require("jssha");
// TODO: update these values to your own
var tenancyId = auth.development.tenancyId
var authUserId = auth.development.authUserId;
var keyFingerprint = auth.development.keyFingerprint;
var privateKeyPath = auth.development.privateKeyPath;
var democompartmentId = auth.development.democompartmentId;

var identityDomain = auth.development.identityDomain;
var coreServicesDomain = auth.development.coreServicesDomain;
var servicedomain = auth.development.servicedomain;

// signing function as described at https://docs.cloud.oracle.com/Content/API/Concepts/signingrequests.htm


function sign(request, options) {

    var apiKeyId = options.tenancyId + "/" + options.userId + "/" + options.keyFingerprint;

    var headersToSign = [
        "host",
        "date",
        "(request-target)"
    ];

    var methodsThatRequireExtraHeaders = ["POST", "PUT"];

    if (methodsThatRequireExtraHeaders.indexOf(request.method.toUpperCase()) !== -1) {
        options.body = options.body || "";

        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(options.body);

        request.setHeader("Content-Length", options.body.length);
        request.setHeader("x-content-sha256", shaObj.getHash('B64'));

        headersToSign = headersToSign.concat([
            "content-type",
            "content-length",
            "x-content-sha256"
        ]);
    }

    httpSignature.sign(request, {
        key: options.privateKey,
        keyId: apiKeyId,
        headers: headersToSign
    });

    var newAuthHeaderValue = request.getHeader("Authorization").replace("Signature ", "Signature version=\"1\",");
    request.setHeader("Authorization", newAuthHeaderValue);
}

// generates a function to handle the https.request response object
function handleRequest(callback) {

    return function (response) {
        var responseBody = "";

        response.on('data', function (chunk) {
            responseBody += chunk;
        });

        response.on('end', function () {
            callback(JSON.parse(responseBody));
        });
    }
}

// gets the user with the specified id
function getUser(userId, callback) {

    var options = {
        host: identityDomain,
        path: "/20160918/users/" + encodeURIComponent(userId),
    };

    var request = https.request(options, handleRequest(callback));

    sign(request, {
        privateKey: privateKey,
        keyFingerprint: keyFingerprint,
        tenancyId: tenancyId,
        userId: authUserId
    });

    request.end();
};

function getInstances(userId, callback) {

    var options = {
        host: coreServicesDomain,
        path: "/20160918/instances/?compartmentId=ocid1.compartment.oc1..aaaaaaaae4v3y2gpwgmin52ld7th3gxmuuhmhsndd4hw7jnxs3htmt4y7xma",
        headers: {
            "Content-Type": "application/json"

        }


    };

    var request = https.request(options, handleRequest(callback));

    sign(request, {
        privateKey: privateKey,
        keyFingerprint: keyFingerprint,
        tenancyId: tenancyId,
        userId: authUserId
    });

    request.end();
};

// creates a Oracle Cloud Infrastructure VCN in the specified compartment
function createVCN(compartmentId, displayName, cidrBlock, callback) {

    var body = JSON.stringify({
        compartmentId: compartmentId,
        displayName: displayName,
        cidrBlock: cidrBlock
    });

    var options = {
        host: coreServicesDomain,
        path: '/20160918/vcns',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    };

    var request = https.request(options, handleRequest(callback));

    sign(request, {
        body: body,
        privateKey: privateKey,
        keyFingerprint: keyFingerprint,
        tenancyId: tenancyId,
        userId: authUserId
    });

    request.end(body);
};

// if (privateKeyPath.indexOf("~/") === 0) {
//     privateKeyPath = privateKeyPath.replace("~", os.homedir())
// }
//var privateKey = fs.readFileSync(privateKeyPath, 'ascii');

// test the above functions
console.log("GET USER:");

// getUser(authUserId, function (data) {
//     console.log(data);

//   //  console.log("\nCREATING VCN:");

//     // TODO: replace this with a compartment you have access to
//   //  var compartmentIdToCreateVcnIn = tenancyId;

//     // createVCN(compartmentIdToCreateVcnIn, "Test-VCN", "10.0.0.0/16", function (data) {
//     //     console.log(data);
//     // });
// });

// getInstances(authUserId, function(data){

//     console.log(data);

// })

// createVCN(democompartmentId, 'OKEVcn', '10.0.0.0/16', function (data) {
//     console.log(data)
// })

function getall1(req, res,next){
    console.log('done 1')
   next()
}

function getall2(req, res){
    console.log('done 2')
    res.send('Done2')
}

module.exports = {
    createVCN,
    getall1,
    getall2
}

