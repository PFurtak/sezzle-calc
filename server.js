const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/history', require('./routes/history'));

app.use('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(5000, () => {
  console.log('Server listening on port 5000...');
});
