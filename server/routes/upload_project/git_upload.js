var shell = require('shelljs');
var fs = require('fs');


if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}



function runscript(req, res, next) {

    
    
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


module.exports = {

    runscript

}