// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function(req, res) {

  let date_object = new Date();

  if(req.params.date === undefined)
  {
    let unix = date_object.getTime();
    let utc = date_object.toUTCString();

    // Returns current date, if route parameter is empty
    res.json({
      'unix': unix,
      'utc': utc
    });
  }
  else
  {

    let is_invalid = false;

    // Checks if the date as string is invalid
    date_object = new Date(req.params.date);
    if(date_object == 'Invalid Date')
    {
      is_invalid = true;

      // Checks if the date as number is invalid
      date_object = new Date(Number(req.params.date));
      if(date_object == 'Invalid Date')
      {
        is_invalid = true;
      }
      else
      {
        is_invalid = false;
      }
    }

    if(is_invalid)
    {
      // Returns error
      res.json({
        'error': 'Invalid Date'
      });
    }
    else
    {
      let unix = date_object.getTime();
      let utc = date_object.toUTCString();

      // Returns unix and json
      res.json({
        'unix': unix,
        'utc': utc
      });
    }
  }

});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
