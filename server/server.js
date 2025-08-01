require('dotenv').config();
const express = require('express'), cors = require('cors'),
  connectDB = require('./config/db'),
  authR = require('./routes/auth'),
  quizR = require('./routes/quizzes'),
  attR = require('./routes/attempts');

const app = express();
connectDB();
app.use(cors(), express.json());
app.use('/api/auth', authR);
app.use('/api/quizzes', quizR);
app.use('/api/attempts', attR);
app.listen(process.env.PORT||5001,()=>console.log('Quiz API up'));
