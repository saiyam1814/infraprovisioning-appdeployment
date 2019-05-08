

const config = require('./config.json');
const app = require('express')();

//  Connect all our routes to our application
const router = require('./routes');
const PORT = process.env.PORT || 3000;

app.use('/', router);




// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000');
});




