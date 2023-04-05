let express = require('express');
let app = express();
let bodyParser = require("body-parser");

const bp = bodyParser.urlencoded({extended: false});

const filepath = "views/index.html";
// This parses the request body of an http request into an object and makes it available through the req.body prop.
app.use(bp);


// This piece of code logs information about each http request into the console whenever they are called. For example: GET /main/myApp.js - {insert IP address here}
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})


// Whenver a request is made to visit the "/" route this function sends back the index.js file in response.
app.get("/", (req, res) => {
  res.sendfile(filepath);
});


// Accessing the static files to go with the html files
app.use("/public", express.static(__dirname + "/public"));

const data = {
  message: "Hello json"
}


//we make use of environment variables to run a simple logic to send "Hello json" in either upper or lowercase in response to a request to access the /json route.
app.get("/json", (req, res)=>{https://boilerplate-express-1.graphicsmonster.repl.co
  if(process.env.MESSAGE_STYLE == 'uppercase'){
    data.message = data.message.toUpperCase();
  }
  res.json(data);
})


// In response to /now request we send date and time in json format.
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
})

// In response to a request to access the "/:word/echo" route, we send a json object containing echo as key and url-param-key "word" as value.
app.get("/:word/echo", (req, res, next) => {
  res.json({echo: req.params.word});
  next();
})


// in response to a request to access the "/name" route, we send a json object containing a "name" key and a full name extracted from query parameters as value in json format.
app.get("/name", (req, res, next) => {
  res.json({name: req.query.first + " " + req.query.last});
  next();
})


// pretty much the same shit but this time we're exclusively handling a http POST request and the value is extracted from req.body instead of url params. This works thanks to the very first operation we performed where we used the bodyparser package to encode the POST request body into the req.body prop for every request.
app.post("/name", (req, res) => {
  res.json({name: req.body.first + " " + req.body.last});
})





 module.exports = app;
