const {router,database} = require('./commonroute')

router.get('/:patientEmail', function(req, res, next) {
    const patientEmail = req.params.patientEmail;
    console.log('sdvskldvsd n',patientEmail)
    database.table('patient').
    filter({patient_emailID : patientEmail}).
    getAll().
    then(doc => {
      if(doc){
        res.status(200).json({
          patient: doc
        })
      }else{
        res.json({
          patient: doc
        }) 
      }
    }).catch(err => console.log(err))
      // res.send('respond with a resource');
    });
    router.post('/:patientEmail', function(req, res, next) {
      const patientEmail = req.params.patientEmail;
      // console.log(patientEmail)
      const updatedPatient = req.body;
      database.
      table('patient').
      filter({patient_emailID:patientEmail}).
      update({
        // patient_id: updatedPatient.displayuid,
        patient_emailID: updatedPatient.email,
        patient_firstName: updatedPatient.patient_firstName,
        patient_lastName: updatedPatient.patient_lastName,
        patient_age: updatedPatient.age,
        patient_address: updatedPatient.patient_address,
        patient_salary: updatedPatient.patient_salary,
        patient_phoneNumber: updatedPatient.patient_phoneNumber
      })
      .catch(err => console.log(err))
    })
    module.exports = router;