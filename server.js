const express = require('express');
const connectDB = require('./config/db');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

connectDB();

app.use(express.json({ extended: false }));
app.use(express.static('client'));

app.use('/api/history', require('./routes/history'));
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected...');
  socket.on('post', (msg) => {
    io.emit('post', msg);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log('Server listening on port 5000...');
});
