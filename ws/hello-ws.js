var net = require('net');

var HOST = '0.0.0.0';
var PORT = 6969;

var connection = mysql.createConnection({     
    host     : '127.0.0.1',       
    user     : 'root',              
    password : 'nanjing',       
    port: '3306',                   
    database: 'TEST', 
  }); 
   
  connection.connect();

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        
        // data = “123，liping，20”；
        var dd = data.splitby(",");
        var id = dd[0];
        var name = dd[1];
        var age = dd[2];

        var  sql = "insert into student (id, name, age) values (" + id + ",'" + name + "'," + age + ")";

        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
     
           console.log('--------------------------SELECT----------------------------');
           console.log(result);
           console.log('------------------------------------------------------------\n\n');  
    });
     

    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        connection.end();
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);