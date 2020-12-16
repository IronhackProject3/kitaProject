const express = require("express");
const router = express.Router();
const Parent = require("../models/Parent");
const User = require("../models/User");
const Kita = require("../models/Kita");

router.get("/", (req, res) => {

  Parent
    .find()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

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

  // const { test } = req.body.kitaInfo;
  const owner = req.user._id;

  // add a new parent application
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
      // adding parent ID into Users table
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

// Set the parent to state across the app (setParent)
router.get("/:id", (req, res) => {
  const parentId = req.params.id;
  console.log("parent Id", parentId);
  Parent
    .findById(
      parentId
    )
    .then((result) => {
      console.log(result); // was trying result.data
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


// Get a list of all kitas a parent has applied for
router.get("/:id/listOfKitas", (req, res) => {
  const parentId = req.params.id;
  console.log("parent Id to get a list of kitas", parentId);
  Kita.find()
    .then(kitas => {
      Parent
      .findById(
        parentId
      )
      // .populate()
      .then((parent) => {
        console.log(parent);

        const kitaNames = parent.applications.map(application => {
          console.log(application);
          const kita = kitas.find(kita => kita._id.toString() === application.kitaId);
          if (kita){
            console.log(kita);
            return kita.kitaName;
          }
        })
        res.status(201).json(kitaNames);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;
