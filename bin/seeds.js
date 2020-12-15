const mongoose = require('mongoose');
const Kita = require('../models/Kita');

mongoose.connect('mongodb://localhost/kita-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('connected');
});

const kitas = [{ kitaName : 'Kita Cheburashka Prenzlauer Berg', Address : 'Bernhard-Lichtenberg-Str. 9', Postcode : '10407', Telephone: '95616294', emailAddress : 'prenzlauer-berg@kitacheburashka.de', freePlaces : 7, languages : ['de', 'ru', 'en'], totalPlaces : 60, theme : 'Something', openTime: '08:30', closeTime: '18:00', minAge : 12, maxAge : 7 } ,
{ kitaName : 'Klax Krippe & Kindergarten', Address : 'Scherenbergstr. 1', Postcode : '10439' , Telephone: '4479 3362', emailAddress : 'regentropfenhaus@klax-krippe.de', freePlaces : 10, languages : ['de'], totalPlaces : 150, theme : '', openTime: '08:30', closeTime: '18:00', minAge : 10, maxAge : 7} ,
{ kitaName : 'Humanistische Kita Prenzlzwerge', Address : 'Stahlheimer Str. 27', Postcode : '10439' , Telephone: '030-445 71 94', emailAddress : 'prenzlzwerge@humanistischekitas.de', freePlaces : 10, languages : ['de'], totalPlaces : 280, theme : '', openTime: '08:30', closeTime: '17:30', minAge : 10, maxAge : 7 } ,
{ kitaName : 'Eltern-Initiativ-Kindertagesstätte', Address : 'Erich-Weinert-Str. 64', Postcode : '10439', Telephone: '44715620', emailAddress : 'libelle-e.v@web.de', freePlaces : 5, languages : ['de'], totalPlaces : 23, theme : 'Eltern-Initiativ-Kindertagesstätte', openTime: '08:30', closeTime: '18:30', minAge : 18, maxAge : 7 } ,
{ kitaName : 'Kita Drachenhöhle', Address : 'Gudvanger Str. 12', Postcode : '10439', Telephone: '12029698', emailAddress : 'kita-dh@drachenreiter.berlin', freePlaces : 10, languages : ['de'], totalPlaces : 26, theme : '', openTime: '09:00', closeTime: '18:30', minAge : 12, maxAge : 7 } ,
{ kitaName : 'Freche Fledermäuse', Address : 'Wichertstr. 57', Postcode : '10439', Telephone: '12029698', emailAddress : 'info@freche-fledermaeuse.de', freePlaces : 10, languages : ['de'], totalPlaces : 22, theme : '', openTime: '08:30', closeTime: '18:30', minAge : 12, maxAge : 7 } ,
{ kitaName : 'Berlin Kids international Kita', Address : 'Wichertstr. 24', Postcode : '10439', Telephone: '74749796', emailAddress : 'berlin-kids-kita@pfefferwerk.de', freePlaces : 10, languages : ['de',  'en'], totalPlaces : 85, theme : '', openTime:'09:00', closeTime: '18:30', minAge : 2, maxAge : 7 } ,
{ kitaName : 'EKT Billabong 02', Address : 'Greifenhagener Str. 14', Postcode : '10437', Telephone: '33850082', emailAddress : 'info@kita-billabong.de', freePlaces : 5,  languages : ['de'], totalPlaces : 20, theme : '', openTime: '08:30', closeTime: '19:00', minAge : 36, maxAge : 7 } ,
{ kitaName : 'Kita Prenzelberger Spielmäuse/Kigä NordOst', Address : 'Pappelallee 41A', Postcode : '10437', Telephone: '44650206', emailAddress : 'kindergarten.pappelallee@kigaeno.de', freePlaces : 15, languages : ['de'], totalPlaces : 50, theme : 'Eltern-Initiativ-Kindertagesstätte', openTime: '08:30', closeTime: '18:30', minAge : 12, maxAge : 7 } ,
{ kitaName : 'Kita Lettestraße 8', Address : 'Lettestr. 8', Postcode : '10437', Telephone: '44719399', emailAddress : 'kitalette@gmx.de', freePlaces : 5, languages : ['de'], totalPlaces : 50, theme : 'Eltern-Initiativ-Kindertagesstätte', openTime: '08:30', closeTime: '18:30', minAge : 12, maxAge : 7 }]

kitas.forEach(kita => {  
  Kita.create(kita);
}); 