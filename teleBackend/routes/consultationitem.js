const {router,database} = require('./commonroute')


router.get('/item/:consultId', function(req, res, next) {
  const consultId = req.params.consultId;
  // const docEmail = req.params.docEmail;
  database.table('consultationitem').
  
  filter({consultation_id:consultId}).
  getAll().
  then(doc => {
    if(doc){
      res.status(200).json({
        consultationitem: doc
      })
    }else{
      res.json({
        error: "not found"
      }) 
    }
  }).catch(err => console.log(err))
  });
  router.post('/item/', function(req, res, next) {
    // const medicineId = req.params.medicineId;
    // console.log(patientEmail)
    const updateConsultationitem = req.body;
    if(updateConsultationitem?.consultationItem_id){
      database.
      table('consultationitem').
      filter({consultationItem_id:updateConsultationitem.consultationItem_id}).
      update({
e,
        consultation_instructions: updateConsultationitem.consultation_instructions,
        consultation_id: updateConsultationitem.consultation_id,
        medicine_id: updateConsultationitem.medicine_id,
      })
      .catch(err => console.log(err))
    }else{
      database.
      table('consultationitem').
      insert({
        consultation_instructions: updateConsultationitem.consultation_instructions,
        consultation_id: updateConsultationitem.consultation_id,
        medicine_id: updateConsultationitem.medicine_id,
      })
      .catch(err => console.log(err))
    }

  })
    module.exports = router;