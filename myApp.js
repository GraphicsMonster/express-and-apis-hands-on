let express = require('express');
let app = express();
let bodyParser = require("body-parser");

const bp = bodyParser.urlencoded({extended: false});

const filepath = "views/index.html";

app.use(bp);

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get("/", (req, res) => {
  res.sendfile(filepath);
});

app.use("/public", express.static(__dirname + "/public"));

const data = {
  message: "Hello json"
}

app.get("/json", (req, res)=>{https://boilerplate-express-1.graphicsmonster.repl.co
  if(process.env.MESSAGE_STYLE == 'uppercase'){
    data.message = data.message.toUpperCase();
  }
  res.json(data);
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
})

app.get("/:word/echo", (req, res, next) => {
  res.json({echo: req.params.word});
  next();
})

app.get("/name", (req, res, next) => {
  res.json({name: req.query.first + " " + req.query.last});
  next();
})

app.post("/name", (req, res) => {
  res.json({name: req.body.first + " " + req.body.last});
})





 module.exports = app;
