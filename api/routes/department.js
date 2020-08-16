var express = require('express');
const db = require('../helpers/db');
var router = express.Router();
const Department = db.Department;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let department = await Department.find();
  res.json({ department });
});

router.post('/create', async (req, res, next) => {
  let params = req.body;
  const department = new Department(params);
  await department.save();

  let response = await Department.findOne({ _id: department._id });
  res.json(response);
});

module.exports = router;
