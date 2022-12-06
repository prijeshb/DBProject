const {router,database} = require('./commonroute')




router.get('/', function(req, res, next) {

  // const medicineId = req.params.medicineId;
  console.log("alllmedicine")
  database.table('medicine').
  // filter({medicine_id : medicineId }).
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

module.exports = router; 