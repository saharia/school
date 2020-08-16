var express = require('express');
const db = require('../helpers/db');
var router = express.Router();
const Mark = db.Mark;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let mark = await Mark.find({ isActive: true })
    .populate('student')
    .populate('subject');

  res.json({ mark });
});

router.post('/create', async (req, res, next) => {
  let params = req.body, mark, id;
  if(params.id) {
    id = params.id;
    await Mark.findOneAndUpdate({ _id: params.id }, params, { returnOriginal: false });
  } else {
    mark = new Mark(params);
    await mark.save();
    id = mark._id;
  }

  let response = await Mark.findOne({ _id: id })
    .populate('student')
    .populate('subject');

  res.json(response);
  
});

router.delete('/delete/:id', async (req, res, next) => {
  let id = req.params.id;
  await Mark.findOneAndUpdate({ _id: id }, { isActive: false }, { returnOriginal: false });
  res.json({ message: 'Record removed successfully!' });
});


module.exports = router;
