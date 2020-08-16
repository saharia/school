var express = require('express');
const db = require('../helpers/db');
var router = express.Router();
const Subject = db.Subject;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let subject = await Subject.find();
  res.json({ subject });
});

router.post('/create', async (req, res, next) => {
  let params = req.body;
  const subject = new Subject(params);
  await subject.save();

  let response =  await Subject.findOne({ _id: subject._id });
  res.json(response);
});

module.exports = router;
