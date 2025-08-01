const express = require('express'),
  Attempt = require('../models/Attempt'),
  Question = require('../models/Question'),
  auth = require('../middleware/auth'),
  router = express.Router();

// submit attempt
router.post('/:quizId', auth, async (req,res)=>{
  const { answers } = req.body; // [{ question, selectedIndex }]
  let correct = 0;
  const detailed = await Promise.all(answers.map(async a=>{
    const q = await Question.findById(a.question);
    const isC = q.correctIndex===a.selectedIndex;
    if(isC) correct++;
    return { ...a, isCorrect:isC };
  }));
  const at = await Attempt.create({
    quiz:req.params.quizId,
    taker: req.user?.id,
    answers: detailed,
    score: correct
  });
  res.json({ score:correct, total:answers.length, detailed });
});

module.exports = router;
