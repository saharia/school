var express = require('express');
const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
const User = db.User;
const Role = db.Role;
const Mark = db.Mark;
const checkAuth = require('../middleware/check-auth');


/* GET users listing. */
router.get('/', checkAuth, async (req, res, next) => {
  let user = await User.find({}).populate('department').populate('subject');
  res.json({ user });
});

router.post('/register', async (req, res, next) => {
  let params = req.body;
  let userExists = await User.findOne({ email: params.emil });
  if(userExists) {
    res.status(401).json({ message: "Email already exists" });
  }
  params.password = bcrypt.hashSync(params.password, 10);
  const user = new User(params);
  await user.save();

  let response = await User.findOne({ _id: user._id })
    .populate('department')
    .populate('subject')
    .populate('role');

  res.json(response);
});

router.get('/authDetails', checkAuth, async (req, res, next) => {
  res.json(req.user);
});

router.get('/students', checkAuth, async (req, res, next) => {
  let students = await User.aggregate([
    { 
      $lookup: {
        from :"roles",
        localField: "role",
        foreignField: "_id",
        as: "roleDetails"
      }
    },
    { 
      $lookup: {
        from :"departments",
        localField: "department",
        foreignField: "_id",
        as: "department"
      }
    },
    {
      $unwind: "$roleDetails"
    },
    {
      $unwind: "$department"
    },
    { 
      $match: {
        "roleDetails.name": {
          $in: [ "student" ]
        },
        isActive: {
          $eq: true
        }
      }
    }
  ]);
  res.json({ students });
});

router.get('/staffs', checkAuth, async (req, res, next) => {
  let staffs = await User.aggregate([
    { 
      $lookup: {
        from :"roles",
        localField: "role",
        foreignField: "_id",
        as: "roleDetails"
      }
    },
    { 
      $lookup: {
        from :"departments",
        localField: "department",
        foreignField: "_id",
        as: "department"
      }
    },
    {
      $unwind: "$roleDetails"
    },
    {
      $unwind: "$department"
    },
    { 
      $match: {
        "roleDetails.name": {
          $in: [ "staff" ]
        },
        isActive: {
          $eq: true
        }
      }
    }
  ]);
  res.json({ staffs });
});

router.get('/registerDetails', async (req, res, next) => {
  let roles = await Role.find({});
  res.json({ roles });
});

router.post('/student/create', async (req, res, next) => {
  let role = await Role.findOne({ name: 'student' });
  let params = req.body, user, id;
  let userExists = await User.findOne({ email: params.email });
  if(params.id) {
    userExists = await User.findOne({ $and: [
      { email: params.email },
      { _id: { $ne: params.id } }
    ]});
  }
  if(userExists) {
    res.status(500).json({ message: "Email already exists" });
  } else {
    params.role = role._id;
    if(params.id) {
      id = params.id;
      await User.findOneAndUpdate({ _id: params.id }, params, { returnOriginal: false });
    } else {
      params.password = bcrypt.hashSync(params.password, 10);
      user = new User(params);
      await user.save();
      id = user._id;
    }
  
    let response = await User.findOne({ _id: id })
      .populate('department')
      .populate('role');
  
    res.json(response);
  }
});

router.post('/staff/create', async (req, res, next) => {
  let role = await Role.findOne({ name: 'staff' });
  let params = req.body, user, id;
  let userExists = await User.findOne({ email: params.email });
  if(params.id) {
    userExists = await User.findOne({ $and: [
      { email: params.email },
      { _id: { $ne: params.id } }
    ]});
  }
  if(userExists) {
    res.status(500).json({ message: "Email already exists" });
  } else {
    params.role = role._id;
    if(params.id) {
      id = params.id;
      await User.findOneAndUpdate({ _id: params.id }, params, { returnOriginal: false });
    } else {
      params.password = bcrypt.hashSync(params.password, 10);
      user = new User(params);
      await user.save();
      id = user._id;
    }
  
    let response = await User.findOne({ _id: id })
      .populate('department')
      .populate('role');
  
    res.json(response);
  }
});


router.get('/home', checkAuth, async (req, res, next) => {
  let role = req.user.role.name, data;
  console.log(role);
  switch(role) {
    case 'student':
      data = await Mark.find().populate('student').populate('subject');
      break;
    case 'staff':
      data = await User.aggregate([
        { 
          $lookup: {
            from :"roles",
            localField: "role",
            foreignField: "_id",
            as: "roleDetails"
          }
        },
        { 
          $lookup: {
            from :"departments",
            localField: "department",
            foreignField: "_id",
            as: "department"
          }
        },
        {
          $unwind: "$roleDetails"
        },
        {
          $unwind: "$department"
        },
        { 
          $match: {
            "roleDetails.name": {
              $in: [ "student" ]
            },
            isActive: {
              $eq: true
            }
          }
        }
      ]);
      break;
    case 'admin':
      data = await User.aggregate([
        { 
          $lookup: {
            from :"roles",
            localField: "role",
            foreignField: "_id",
            as: "roleDetails"
          }
        },
        { 
          $lookup: {
            from :"departments",
            localField: "department",
            foreignField: "_id",
            as: "department"
          }
        },
        {
          $unwind: "$roleDetails"
        },
        {
          $unwind: "$department"
        },
        { 
          $match: {
            "roleDetails.name": {
              $in: [ "staff" ]
            },
            isActive: {
              $eq: true
            }
          }
        }
      ]);
      break;
  }

  res.json({ data, user: req.user });
});

router.post('/login', async (req, res, next) => {
  let email = req.body.email, response = null, password = req.body.password;
  const user = await User.findOne({ email });
  // console.log(user, email);
  if (user && bcrypt.compareSync(password, user.password)) {
    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign({ sub: user._id }, 'secret');
    response = {
      ...userWithoutHash,
      token
    };
  }
  res.json(response);
});

router.delete('/staff/delete/:id', async (req, res, next) => {
  let id = req.params.id;
  await User.findOneAndUpdate({ _id: id }, { isActive: false }, { returnOriginal: false });
  res.json({ message: 'Record removed successfully!' });
});

router.delete('/student/delete/:id', async (req, res, next) => {
  let id = req.query.id;
  await User.findOneAndUpdate({ _id: id }, { isActive: false }, { returnOriginal: false });
  res.json({ message: 'Record removed successfully!' });
});

module.exports = router;
