const express = require ('express');
const router = express.Router();

// get all kitas
router.get('/', (req, res) => {
  Kita.find()
    .then(kitas => {
      res.status(200).json(kitas);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;

// create a kita
// router.post('/', (req, res) => {
//   const { add keys } = req.body;
//   Kita.create({
//     key,
//     key2,
//     key3
//   })
//   .then(kita => {
//     res.status(201).json(kita);
//   })
//   .catch(err =>)
// })