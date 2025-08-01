const express = require('express'),
  Quiz = require('../models/Quiz'),
  Question = require('../models/Question'),
  auth = require('../middleware/auth'),
  router = express.Router();

// list quizzes
router.get('/', async (req,res)=>{
  const q = await Quiz.find().sort('-createdAt');
  res.json(q);
});

// create quiz
router.post('/', auth, async (req,res)=>{
  if(!req.user) return res.status(401).end();
  const quiz = await Quiz.create({ title:req.body.title, creator:req.user.id });
  res.json(quiz);
});

// add questions
router.post('/:id/questions', auth, async (req,res)=>{
  const arr = req.body.questions.map(q=>({
    quiz:req.params.id, text:q.text, choices:q.choices, correctIndex:q.correctIndex
  }));
  const docs = await Question.insertMany(arr);
  res.json(docs);
});

// get full quiz (with questions)
router.get('/:id', async (req,res)=>{
  const quiz = await Quiz.findById(req.params.id);
  const qs = await Question.find({ quiz:req.params.id });
  res.json({ quiz, questions:qs });
});

module.exports = router;
