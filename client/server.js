const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 8282;

var app = express();
app.use(express.static(__dirname + '/public', {
  extensions: ['html', 'htm'],
}));

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to log file');
    }
  });
  next();
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
