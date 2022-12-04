var express = require('express');
var router = express.Router();
const {database} = require('../helpers/connector/dbConnector')

/* GET users listing. */
router.get('/:docEmail', function(req, res, next) {

  const docEmail = req.params.docEmail;
  console.log("docs email")
  database.table('doctor').
  filter({doctor_emailID:docEmail}).
  getAll().
  then(doc => {
    if(doc){
      res.status(200).json({
        doctor: doc
      })
    }else{
      res.json({
        failed: "error"
      }) 
    }
  }).catch(err => console.log(err))
  });

  router.get('/all', function(req, res, next) {

    // const docEmail = req.params.docEmail;
    database.table('doctor').
    getAll().
    then(doc => {
      if(doc){
        res.status(200).json({
          doctors: doc
        })
      }else{
        res.json({
          failed: "error"
        }) 
      }
    }).catch(err => console.log(err))
    });


  router.post('/:docEmail', function(req, res, next) {
    const docEmail = req.params.docEmail;
    const updatedDoc = req.body;
    console.log(docEmail,updatedDoc);
    database.
    table('doctor').
    filter({doctor_emailID:docEmail}).
    update({
      // patient_id: updatedPatient.displayuid,
      doctor_emailID: updatedDoc.doctor_emailID ,
      doctor_firstName: updatedDoc.doctor_firstName,
      doctor_lastName: updatedDoc.doctor_lastName,
      doctor_specialization: updatedDoc.doctor_specialization,
      doctor_availability: updatedDoc.doctor_availability,
      doctor_fees: updatedDoc.doctor_fees,
      doctor_phoneNumber: updatedDoc.doctor_phoneNumber,
      total_earnings: updatedDoc.total_earnings,
      doctor_address: updatedDoc.doctor_address
    })
    .catch(err => console.log(err))
    // res.json({s})
  })

module.exports = router;
