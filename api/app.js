const httpError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()
const db = require('./repositories/connectDB');
const { UserRouter } = require('./routes/admin/admin.routes');
<<<<<<< HEAD
const SubjectRouter = require('./routes/subject.router');
const QuizRouter = require('./routes/quiz.router')
const ChapterRouter = require('./routes/chapter.router')
const QuestionRouter = require('./routes/question.router')
=======
const AuthRouter = require('./routes/auth/auth.route');
>>>>>>> e54da6d (Update Login register logout)

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
<<<<<<< HEAD
app.use(cors({
  origin: 'http://localhost:'+process.env.PORT_CLIENT,
=======
const PORT_CLIENT = process.env.PORT_CLIENT || 3000;
app.use(cors({
  origin: `http://localhost:${PORT_CLIENT}`,
>>>>>>> e54da6d (Update Login register logout)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use('/admin/user', UserRouter);
<<<<<<< HEAD
app.use('/subject', SubjectRouter);
app.use('/quiz', QuizRouter);
app.use('/chapter', ChapterRouter);
app.use('/question', QuestionRouter);

=======
app.use('/auth', AuthRouter);
>>>>>>> e54da6d (Update Login register logout)
app.use((req, res, next) => {
  next(httpError(404, 'Not Found'));
});

// Centralized Error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  })
});
app.listen(process.env.PORT,process.env.HOST_NAME, async() => {
  console.log(`Server starting at http://${process.env.HOST_NAME}:${process.env.PORT}`);
  await db.connectDB();
})
module.exports = app;
