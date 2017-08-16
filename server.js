const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => { // 必須先在連線範圍作用域才可以做事
  console.log('a user connected');

  // console.log('url' + socket.handshake.url);
  // console.log(socket.handshake.query.token);

  socket.on('chat', (msg) => { // client就是簡單使用on和emit
    console.log('message: ' + msg);
    socket.broadcast.to('mainPage').emit('message', msg); // 廣播所有人除了自己
    socket.emit('message', msg); // 傳給自己
  });


  // socket.join('房間名稱')  // 讓client加入房間
  // socket.leave('房間名稱') // 讓client離開房間
  // socket.broadcast.to('房間名稱').emit('chat',{data: res}); // 給特定房間廣播訊息
  socket.on('mainPage', () => {
    socket.join('mainPage', () => {
      console.log('join chat okok');
    });
  });

  socket.on('chatPage', () => {
    socket.join('chatPage', () => {
      console.log('join chat okok');
    });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});