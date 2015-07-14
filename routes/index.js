var express = require('express');
var router = express.Router();
var _ = require('lodash');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./to-do.html');
});

router.get('/remove_action',function(req,res){
  var task_to_be_removed = req.param('task_name');
  console.log(task_to_be_removed);
});

router.get('/newtask',function(req,res){
  console.log('inside adding new task');
  //redirect to new html page to add new task
  res.redirect('/');
});
module.exports = router;
