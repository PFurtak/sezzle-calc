const express = require('express');
const router = express.Router();
const Exp = require('../models/ExpressionModel');

// GET /api/history
router.get('/', async (req, res) => {
  try {
    const history = await Exp.find()
      .sort({
        created: -1,
      })
      .limit(10);
    res.status(200).json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/history
router.post('/', async (req, res) => {
  const { expression } = req.body;
  try {
    const newExp = new Exp({
      expression,
    });
    const exp = await newExp.save();
    res.status(201).json(exp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
