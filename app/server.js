require('dotenv').config();
var port = process.env.PORT || 3000;
const app = require('./app');

var listener = app.listen(port, function () {
  console.log('Your app is listening on localhost:' + listener.address().port);
});
