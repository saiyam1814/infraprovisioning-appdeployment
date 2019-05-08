
const router = require('express').Router({ mergeParams: true });

const bodyParser = require('body-parser');

const oracle_api = require('./oracle_apis');
const upload = require('./upload_project')
const tform = require('./terraformapis')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
router.use(bodyParser.json());
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
router.use(bodyParser.raw());
// parse text
router.use(bodyParser.text());


//router.use('/oci', oracle_api);
router.use('/upload', upload);
router.use('/terraform', tform);




router.get('/', (req, res) => {

  res.status(200).json({ message: 'Connected!' });
});



module.exports = router;