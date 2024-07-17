const httpError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()
const db = require('./repositories/connectDB');
const { UserRouter } = require('./routes/admin/admin.routes');
const SubjectRouter = require('./routes/subject.router');
const QuizRouter = require('./routes/quiz.router')
const ChapterRouter = require('./routes/chapter.router')
const QuestionRouter = require('./routes/question.router')
const AuthRouter = require('./routes/auth/auth.route');
const joinedSubjectRouter = require('./routes/trainee/joinedSubject.route');
const SubmittedQuizRouter = require('./routes/submitted-quiz.routes');
const momoRouter = require('./routes/payments/momo.route');
const transactionRouter = require('./routes/admin/transaction.route');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT_CLIENT = process.env.PORT_CLIENT || 3000;
app.use(cors({
  origin: `http://localhost:${PORT_CLIENT}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use('/admin/user', UserRouter);
app.use('/admin/transaction', transactionRouter);
app.use('/subject', SubjectRouter);
app.use('/quiz', QuizRouter);
app.use('/chapter', ChapterRouter);
app.use('/question', QuestionRouter);
app.use('/submitted-quiz', SubmittedQuizRouter);
app.use('/auth', AuthRouter);
app.use('/trainee', joinedSubjectRouter)
app.use('/payment', momoRouter)
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
