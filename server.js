const proxy = require('express-http-proxy');
const express = require('express');
const parser = require('body-parser');
const request = require('request');
const app = express();

const formData = {
  login: 'value',
  email: 'vasyapupkin',
  password: 'qwerty'
};

// Set the headers
const headers = {
  'DataServiceVersion': '2.0',
  'Content-Type': 'application/json; odata=verbose'
};

// Configure the request
const options = {
  url: 'http://ananymous.herokuapp.com/api/signup',
  method: 'POST',
  headers: headers,
  form: {
    'login': 'value',
    'email': 'vasyapupkin',
    'password': 'qwerty'
  }
};

// Start the request
request(options, function (error, response, body) {
  if (!error) {
    // Print out the response body
    console.log(body)
  }
});

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static('public'));
app.use('/SignUp', express.static('public'));
app.use('/SignIn', express.static('public'));
app.use('/proxy', proxy('www.google.com'));

app.use(parser.json());

let emails = {};

app.post('/users', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log('email: ' + email);
  console.log('password: ' + password);

  if (!emails[email]) {
    emails[email] = {
      password: password
    };
  }
  request({
      method: 'POST',
      preambleCRLF: true,
      postambleCRLF: true,
      uri: 'localhost:4000',
      'Content-Type': 'application/json',
      body: JSON.stringify(formData)
    },
    function (error, response, body) {
      if (error) {
        return console.error('upload failed:', error);
      }
      console.log('Upload successful!  Server responded with:', response);
    });
  res.send(emails[email]);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
