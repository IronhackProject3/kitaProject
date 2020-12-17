const express = require("express");
const router = express.Router();
const Parent = require("../models/Parent");
const User = require("../models/User");
const Kita = require("../models/Kita");
const { application } = require("express");

router.get("/", (req, res) => {

  Parent
    .find()
    .then((result) => {
      // console.log(result);
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
    ParentAddress,
    ParentPostcode,
    applications,
    kitaId,
    homeLanguage,
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
    ParentAddress,
    ParentPostcode,
    applications: req.body.kitaInfo.kitaId ? [
      {
        kitaId: req.body.kitaInfo.kitaId,
        kitaPriority: 0,
        parentPriority: 0
      },
    ] : [],
    kitaId,
    homeLanguage,
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
  const { kitaId, kitaPriority, parentPriority, date } = req.body;

  Parent.findById(parentId)
  .then((result) => {
    Parent.findByIdAndUpdate(
      parentId,
      {
        $push: {
          applications: {
            kitaId,
            kitaPriority,
            parentPriority: result.applications.length,
            date,
          },
        },
      },
      { new: true }
    )
      .then((result) => {
        console.log(result);
        res.status(201).json(result);
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

router.put("/:id/reOrderApplications", (req, res) => {
  const parentId = req.params.id;
  const { applications } = req.body;

  Parent.findByIdAndUpdate(
    parentId,
    {
      applications: applications
    },
    { new: true }
  )
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
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
      console.log(result);
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
      .then((parent) => {
        const kitaNames = parent.applications.map(application => {
          const kita = kitas.find(kita => kita._id.toString() === application.kitaId);
          console.log(kita);
          if (kita && kita != null){
            return {
              _id: application._id,
              kitaId: application.kitaId,
              kitaPriority: application.kitaPriority ? application.kitaPriority : 0,
              parentPriority: application.parentPriority ? application.parentPriority : 0,
              date: application.date,
              kitaName: kita.kitaName
            };
          }
        })

        console.log('kitaNames',kitaNames);
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
