const express = require('express');
const router = express.Router();
const Parent = require('../models/Parent');
const User = require('../models/User');


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
  
  const owner = req.user._id;
  // console.log('help with Yosef', boyGirl);

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
    .then(parent => {
      
      User.findByIdAndUpdate(
        owner,
        {
          type: 'parent', // type: parent
          parent: parent._id // parent: parent._id
         },
        // this ensures that we are getting the updated document as a return 
        { new: true }
      ).then(result => {
        console.log(result);
        res.status(201).json(parent);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })

});


module.exports = router;