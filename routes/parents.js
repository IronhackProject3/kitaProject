const express = require('express');
const router = express.Router();
const Parent = require('../models/Parent');




router.post('/addParent', (req, res) => {
  const { 
    
    childFName,
    childSName,
    dob,
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
  console.log('help with Yosef 1', childSName);

  Parent.create({
    childFName,
    childSName,
    dob,
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
      res.json(err)
    })

});


module.exports = router;