const express = require ('express');
const router = express.Router();
const Kita = require('../models/Kita');

// get all kitas
router.get('/', (req, res) => {
  Kita.find()
    .then(kitas => {
      // console.log('kitas', kitas);
      res.status(200).json(kitas);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;