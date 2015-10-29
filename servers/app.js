var path = require('path'),
	express = require('express'), //引入express模块
	http = require('http'),
	app = express(),
      problemdb=require('./db/problem'),
	server = require('http').createServer(app);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '80');


/**
 * Create HTTP server.
 */

    
app.use(express.static(path.join(__dirname, '../www'))); //指定静态HTML文件的位置
app.use(express.static(path.join(__dirname, '../bower_components')));
server.listen(port);

var teacher=null;
var users=[];

var io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    //�ǳ�����

    socket.on('teacher_login',function (argument) {

      console.log("教师端以登录！");
      socket.on('save_problem',function  (pro,key) {


        key=key || "ID_"+(+new Date());

        
        

        problemdb.set(key,pro);

        console.log("保存题目:",pro,key);

      });

      socket.on('del_pro',function(key) {

        if(!key) return false;

       

        
        

        problemdb.remove(key);

        console.log("删除题目:",key);

      });


      socket.on('get_all_pro',function  () {
        console.log("获取所有题目");

        problemdb.filter(20,function  (obj,key) {
          return true;
        }, function (datas) {
          socket.emit('all_pro_data',datas);
        });
        
      });
      
      socket.on('message', function(e) {
          console.log("message：",e);
      });

      socket.on('anything', function(e) {
          console.log("anything:",e);
      });


    });



    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userIndex = users.length;
		 socket.nickname = nickname;
		 users.push(nickname);
		 socket.emit('loginSuccess');
		 io.sockets.emit('system', nickname, users.length, 'login');
        };


	socket.on('disconnect', function() {
	    //���Ͽ����ӵ��û���users��ɾ��
	    users.splice(socket.userIndex, 1);
	    //֪ͨ���Լ�������������
	    socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
	});

	socket.on('postMsg', function(msg) {
		//����Ϣ���͵����Լ����������û�
		socket.broadcast.emit('newMsg', socket.nickname, msg);
	    });

	socket.on('img', function(imgData) {
	    //ͨ��һ��newImg�¼��ַ������Լ�����ÿ���û�
	     socket.broadcast.emit('newImg', socket.nickname, imgData);
	 });


    });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
