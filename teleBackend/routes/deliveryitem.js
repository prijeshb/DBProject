const {router,database} = require('./commonroute')

router.get('/', function(req, res, next) {


    database.query('select * from `telemedicine`.`doctor` limit 10').then(result => {
        console.log(result)
      })
      res.send('respond with a resource');
    });
    
    module.exports = router;