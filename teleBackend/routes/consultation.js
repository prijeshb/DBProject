const {router,database} = require('./commonroute')

router.get('/:patientId/all', function(req, res, next) {
  const patientId = req.params.patientId;
  // const docEmail = req.params.docEmail;
  database.table('consultation').
  
  filter({patient_id:patientId}).
  getAll().
  then(doc => {
    if(doc){
      res.status(200).json({
        consultApts: doc
      })
    }else{
      res.json({
        failed: "error"
      }) 
    }
  }).catch(err => console.log(err))
  });
router.post('/:consultID', function(req, res, next) {
  const consultID = req.params.consultID;
  const consultApt = req.body;
  console.log(consultID,consultApt);
  database.
  table('consultation').
  filter({doctor_emailID:docEmail}).
  create({
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