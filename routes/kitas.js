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

// get a specfic kita
router.get('/:id', (req, res, next) => {
  console.log('kitaaaa');
  Kita.findById(req.params.id)
    .then(kita => {
      console.log('kita', kita);
      if (!kita) {
        console.log('no kita found');
        res.status(404).json(kita);
      } else {
        res.status(200).json(kita);
      }
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;