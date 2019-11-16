var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var socketIO = require('socket.io');



var app = express();

var authService = require('./services/authService');


app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
    })

//database'e bağlanma
mongoose.connect("mongodb+srv://hakan:199212267474@cluster0-mx04j.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true },(error) =>{
    if(!error){
        console.log('Mongoya Bağlandık')
    }
    
})

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));

//service'lerin kullanılması
app.use('/user',authService.router);

app.get('/get',(req,res) => {
    res.send('merhaba get');
})

app.get('/get',(req,res) => {
    res.send('merhaba get');
})

var server = app.listen(process.env.PORT);


//io kullanımı
var io = socketIO(server)

io.on('connection',(socket) => {
    console.log('User Connected')
    socket.on('new-message',(message) =>{
        io.emit('new-message',{message:message.message,date:new Date(),username:message.username})
    })
})


   
