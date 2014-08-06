var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	path = require('path');

	mongoose.connect('mongodb://localhost/mic');
	appDir = path.dirname(require.main.filename);

app.engine('html', require('ejs').renderFile);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())	

app.all('/', function(req,res) {
	res.send('Hello Node!');
});

//load models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
	require(__dirname + '/models/' + file)(mongoose);
});

//load routes
fs.readdirSync(__dirname + '/routes').forEach(function(file) {
	require(__dirname + '/routes/' + file)(app,mongoose);
});

//load statics
app.use(express.static(__dirname + '/public'));

//render 404
app.use(function(req, res){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404.html', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(3000);