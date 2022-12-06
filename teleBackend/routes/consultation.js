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

router.post('/update/:id', function(req, res, next) {
  // const consultID = req.params.consultID;
  const consultApt = req.body;
  console.log(consultApt);
  database.
  table('consultation').
  // filter({doctor_emailID:docEmail}).
  insert({
    // patient_id: updatedPatient.displayuid,
    consultation_date: consultApt.consultation_date ,
    doctor_id: consultApt.doctor_id,
    chemist_id: consultApt.chemist_id,
    patient_id: consultApt.patient_id,
    consultation_id: consultApt.consultation_id

  })
  .catch(err => console.log(err))
  res.json({
    success:"created"
  })
})
    module.exports = router;