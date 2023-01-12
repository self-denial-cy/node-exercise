const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', userRouter);

app.listen(3001, () => {
  console.log('server running at http://127.0.0.1:3001');
});
