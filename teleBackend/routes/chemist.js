const {router,database} = require('./commonroute')



router.get('/pharmacy/:chemistEmail', function(req, res, next) {

// console.log("sfvsvsvsvsv")
  const chemistEmail = req.params.chemistEmail;
  console.log(chemistEmail)
  database.
  table('chemist').
  filter({pharmacy_emailID : chemistEmail}).
  getAll().
  then(doc => {
    if(doc){
      res.status(200).json({
        chemist: doc
      })
    }else{
      res.json({
        chemist: doc
      }) 
    }
  }).catch(err => console.log(err))
  });

  router.get('/allchemist', function(req, res, next) {

    // const docEmail = req.params.docEmail;
    database.table('chemist').
    getAll().
    then(doc => {
      if(doc){
        res.status(200).json({
          chemist: doc
        })
      }else{
        res.json({
          failed: "error"
        }) 
      }
    }).catch(err => console.log(err))
    });

  router.post('/pharmacy/:chemistEmail', function(req, res, next) {
    const chemistEmail = req.params.chemistEmail;
    console.log(chemistEmail)
    const updatedChemist = req.body;
    database.
    table('chemist').
    filter({pharmacy_emailID:chemistEmail}).
    update({
      // patient_id: updatedPatient.displayuid,
      // pharmacy_emailID: updatedChemist.pharmacy_emailID,
      chemist_firstName: updatedChemist.chemist_firstName,
      chemist_lastName: updatedChemist.chemist_lastName,
      pharmacy_name: updatedChemist.pharmacy_name,
      pharmacy_address: updatedChemist.pharmacy_address,
      // pharmacy_emailID: updatedChemist.pharmacy_emailID,
      pharmacy_phoneNumber: updatedChemist.pharmacy_phoneNumber
    })
    .catch(err => console.log(err))
  })
    
module.exports = router;