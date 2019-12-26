var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cc',function(req,res){
   res.send('你的网站');
})

module.exports = router;
