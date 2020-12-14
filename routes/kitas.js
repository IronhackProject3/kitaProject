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
router.post('/addKita', (req, res) => {
  const { languages, kitaName, address, postcode, telephone, emailAddress, freePlaces, mapLink, totalPlaces, theme, openTime, closeTime, minAge, maxAge } = req.body;
  // const { childFName, childSName, dob, Parent1FName } = req.body;
  const owner = req.user._id;
  Kita.create({
    languages: languages,
    kitaName: kitaName,
    Address: address,
    Postcode: postcode,
    Telephone: telephone,
    emailAddress: emailAddress,
    freePlaces: freePlaces,
    mapLink: mapLink,
    totalPlaces: totalPlaces,
    theme: theme,
    openTime: openTime,
    closeTime: closeTime,
    minAge: minAge,
    maxAge: maxAge,
  })
    .then(kita => {
      console.log(kita);
      User.findByIdAndUpdate(
        owner,
        {
          type: 'kita', // type: parent
          kita: kita._id // parent: parent._id
         },
        // this ensures that we are getting the updated document as a return 
        { new: true }
      ).then(result => {
        console.log(result);
        res.status(201).json(kita);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})


// edit kita's information
router.put('/:edit', (req, res) => {
  const { languages, kitaName, address, postcode, telephone, emailAddress, freePlaces, mapLink, totalPlaces, theme, openTime, closeTime, minAge, maxAge } = req.body;
  Kita.findByIdAndUpdate(
    req.params.id,
    { 
      languages: languages,
      kitaName: kitaName,
      Address: address,
      Postcode: postcode,
      Telephone: telephone,
      emailAddress: emailAddress,
      freePlaces: freePlaces,
      mapLink: mapLink,
      totalPlaces: totalPlaces,
      theme: theme,
      openTime: openTime,
      closeTime: closeTime,
      minAge: minAge,
      maxAge: maxAge,
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