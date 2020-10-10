const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(express.static('client'));

app.use('/api/history', require('./routes/history'));
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(5000, () => {
  console.log('Server listening on port 5000...');
});
