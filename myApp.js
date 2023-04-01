let express = require('express');
let app = express();

const filepath = "views/index.html";

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

app.get("/json", (req, res)=>{
  if(process.env.MESSAGE_STYLE == 'uppercase'){
    data.message = data.message.toUpperCase();
  }
  res.json(data);
})

































 module.exports = app;
