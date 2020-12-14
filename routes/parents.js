const express = require('express');
const router = express.Router();
const Parent = require('../models/Parent');




router.post('/addParent', (req, res) => {
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
    homeLanguage,
    specialNeeds,
    specialNeedsDetails

  
  } = req.body;
  console.log('help with Yosef', boyGirl);

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
    homeLanguage,
    specialNeeds,
    specialNeedsDetails
    
  })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })

});


module.exports = router;