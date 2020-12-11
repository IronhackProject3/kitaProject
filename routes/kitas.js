const express = require ('express');
const router = express.Router();
const Kita = require('../models/Kita');
const User = require('../models/User');


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
router.get('/:id', (req, res) => {
  // console.log('kita');
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



// add a kita
router.post('/', (req, res) => {
  const { kitaName, Address, Postcode, Telephone, emailAddress, freePlaces, mapLink, languages, totalPlaces, theme, openTime, closeTime, minAge, maxAge } = req.body;
  // const { childFName, childSName, dob, Parent1FName } = req.body;
  const owner = req.user._id;
  Kita.create({
    kitaName,
    Address,
    Postcode,
    Telephone,
    emailAddress,
    freePlaces,
    mapLink,
    languages,
    totalPlaces,
    theme,
    openTime,
    closeTime,
    minAge,
    maxAge,
    //owner userId
  })
    .then(kita => {
      User.findByIdAndUpdate(
        owner,
        { 
          kita: kita._id
         },
        // this ensures that we are getting the updated document as a return 
        { new: true }
      )
      res.status(201).json(kita);
    })
    .catch(err => {
      res.json(err);
    })
})

// add parents
router.post('/', (req, res) => {
  const { childFName, childSName, dob, Parent1FName } = req.body;
  const owner = req.user._id;
  Kita.create({
    kitaName,
    Address,
    Postcode,
    Telephone,
    emailAddress,
    freePlaces,
    mapLink,
    languages,
    totalPlaces,
    theme,
    openTime,
    closeTime,
    minAge,
    maxAge,
    //owner userId
  })
    .then(kita => {
      User.findByIdAndUpdate(
        owner,
        { 
          kita: kita._id
         },
        // this ensures that we are getting the updated document as a return 
        { new: true }
      )
      res.status(201).json(kita);
    })
    .catch(err => {
      res.json(err);
    })
})


// edit kita's information
router.put('/:id', (req, res) => {
  const { title, description } = req.body;
  Kita.findByIdAndUpdate(
    req.params.id,
    { 
      kitaName,
      Address,
      Postcode,
      Telephone,
      emailAddress,
      freePlaces,
      mapLink,
      languages,
      totalPlaces,
      theme,
      openTime,
      closeTime,
      minAge,
      maxAge
     },
    // this ensures that we are getting the updated document as a return 
    { new: true }
  )
    .then(kita => {
      console.log(kita);
      res.status(200).json(kita);
    })
    .catch(err => {

    })
});

module.exports = router;