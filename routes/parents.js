const express = require('express');
const router = express.Router();
const Parents = require('../models/Parent');




router.post('/', (req, res) => {
  const { childFName } = req.body;
  console.log('help with Yosef', childFName);
  Parents.create({
    childFName
  })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.json(err)
    })

});


module.exports = router;