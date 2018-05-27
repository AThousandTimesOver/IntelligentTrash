var express = require('express');
var app = express();
var mysql  = require('mysql'); 
const bodyParser = require('body-parser');
var session = require('client-sessions');
var URL = require('url');

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 10 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));

app.use(express.static('statics'));

app.get('/signin', function (req, res) {
    console.log("---------------------signin");
    res.sendFile( __dirname + "/" + "signin.html" );
 }) 

app.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
  });

 app.all('/isexist', function (req, res) {
     name = req.body.username;
     psw = req.body.password;
    //console.log(name + "+" + psw);
    if(name == "admin" && psw == "123456"){  
        //res.redirect('/display');
        req.session.username = name;
        res.end(JSON.stringify({
            status : true
        }));
    } else {
        res.end(JSON.stringify({
            status : false
        }));
    }
 })

 app.use(function(req, res, next) {
    console.log(req.url);
    if (req.session && req.session.username) {
        if(req.session.username == "admin"){
          req.username = req.session.username;
          req.session.username = req.session.username;  //refresh the session value
          res.locals.username = req.session.username;
        }
        // finishing processing the middleware and run the route
        next();
    } else {
        if (//req.url != "/signin" && 
        !req.session.username) {  
            return res.redirect("/signin");
        }
        console.log("-------------------1");
      next();
    }
});

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "duogebiaozhu.html" );
})



 



app.get('/display', function (req, res) {
    res.sendFile( __dirname + "/" + "duogebiaozhu.html" );
 })
 
app.get('/getTrashStatus', function (req, res) {
 
//    // 输出 JSON 格式
//    var response = {
//     //    "first_name":req.query.first_name,
//     //    "last_name":req.query.last_name
//         'num': 3,
//         1: 3,
//         2: 2,
//         3: 1
//     }
   
//    console.log(response);
//    res.end(JSON.stringify(response));
    readFromDatabase(req, res);
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})


function  readFromDatabase(req, res) {
    var connection = mysql.createConnection({     
        host     : '155.94.133.63',//'127.0.0.1',       
        user     : '1943',              
        password : 'njau',       
        port: '3306',                   
        database: 'TRASH', 
      }); 
       
      connection.connect();
    
     var  sql = 'SELECT * FROM data';
    //查
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        
        res.end(JSON.stringify(result));

        // console.log('--------------------------SELECT----------------------------');
        // console.log(result);
        // console.log('------------------------------------------------------------\n\n');  
    
    
    });
     
    connection.end();
     
}