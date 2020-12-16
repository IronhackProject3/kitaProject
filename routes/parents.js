const express = require("express");
const router = express.Router();
const Parent = require("../models/Parent");
const User = require("../models/User");
const ObjectId = require('mongoose').Types.ObjectId;

router.post("/addParent", (req, res) => {
  const {
    childFName,
    childSName,
    dob,
    boyGirl,
    Parent1FName,
    Parent1SName,
    Parent1Phone,
    Parent1Email,
    Parent2FName,
    Parent2SName,
    Parent2Phone,
    Parent2Email,
    applications,
    kitaId,
    homeLanguage,
    specialNeeds,
    specialNeedsDetails,
  } = req.body.parentInfo;

  const { test } = req.body.kitaInfo;

  const owner = req.user._id;

  Parent.create({
    childFName,
    childSName,
    dob,
    boyGirl,
    Parent1FName,
    Parent1SName,
    Parent1Phone,
    Parent1Email,
    Parent2FName,
    Parent2SName,
    Parent2Phone,
    Parent2Email,
    applications: [
      {
        kitaId: req.body.kitaInfo.kitaId,
        kitaPriority: "",
      },
    ],
    kitaId,
    homeLanguage,
    specialNeeds,
    specialNeedsDetails,
  })
    .then((parent) => {
      User.findByIdAndUpdate(
        owner,
        {
          type: "parent",
          parent: parent._id,
        },
        { new: true }
      )
        .then((result) => {
          console.log(result);
          res.status(201).json(parent);
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// adding multiple applications to a parent table
router.post("/:id/addApplication", (req, res) => {
  const parentId = req.params.id;
  const { kitaId, kitaPriority, date } = req.body;

  Parent.findByIdAndUpdate(
    parentId,
    {
      $push: {
        applications: {
          kitaId,
          kitaPriority,
          date,
        },
      },
    },
    { new: true }
  )
    .then((result) => {
      console.log(result);
      res.status(201).json(parent);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// trying to set the parent to state across the app (setParent)
// added axios call on Login.js --> manage to get the 
// parent ID on login but dont manage to get the match on MongoDB
router.get("/:id", (req, res) => {
  const parentId = req.params.id;
console.log(parentId);
  Parent
    .findById(
      parentId,
      { new: true }
    )
    //.find({"_id" : mongoose.Types.ObjectId(parentId)})
    //.findById(new ObjectId(parentId))
    .then((result) => {
      console.log(result.data);
      res.status(201).json(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
