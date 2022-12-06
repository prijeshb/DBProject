const {router,database} = require('./commonroute')




// router.get('/all', function(req, res, next) {

//   // const medicineId = req.params.medicineId;
//   console.log("alllmedicine")
//   database.table('medicine').
//   // filter({medicine_id : medicineId }).
//   getAll().
//   then(doc => {
//     // console.log(doc)
//     if(doc){
//       res.status(200).json({
//         medicine: doc
//       })
//     }else{
//       res.json({
//         error: "not found"
//       }) 
//     }
//   })
//     // res.send('respond with a resource');
// });
router.get('/med/:medicineId', function(req, res, next) {

  const medicineId = req.params.medicineId;
  database.table('medicine').
  filter({medicine_id : medicineId }).
  getAll().
  then(doc => {
    // console.log(doc)
    if(doc){
      res.status(200).json({
        medicine: doc
      })
    }else{
      res.json({
        error: "not found"
      }) 
    }
  })
    // res.send('respond with a resource');
});



  router.post('/med/update', function(req, res, next) {
    // const medicineId = req.params.medicineId;
    console.log("sdvnsdlkjnln medicine")
    const updatedMedicine = req.body;
    if(updatedMedicine.medicine_id){
      database.
      table('medicine').
      filter({medicine_id:updatedMedicine.medicine_id}).
      update({
        // patient_id: updatedPatient.displayuid,
        medicine_name: updatedMedicine.medicine_name,
        medicine_price: updatedMedicine.medicine_price,
        medicine_quantity: updatedMedicine.medicine_quantity,
        medicine_expiryDate: updatedMedicine.medicine_expiryDate.split("/").reverse().join("-"),
      })
      .catch(err => console.log(err))
    }else{
      database.
      table('medicine').
      // filter({medicine_id:updatedMedicine.medicine_id}).
      insert({
        // patient_id: updatedPatient.displayuid,
        medicine_name: updatedMedicine.medicine_name,
        medicine_price: updatedMedicine.medicine_price,
        medicine_quantity: updatedMedicine.medicine_quantity,
        medicine_expiryDate: updatedMedicine.medicine_expiryDate.split("/").reverse().join("-"),
      })
      .catch(err => console.log(err))
    }

  })
    module.exports = router;