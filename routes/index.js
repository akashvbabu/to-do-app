var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs');
var tasks = require('../public/to_do_list.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./to-do.html');
});

router.get('/remove_action',function(req,res){
  var task_to_be_removed = req.param('task_name');
  console.log(task_to_be_removed);
  var index_to_be_removed = _.findIndex(tasks,'name',task_to_be_removed);
  if(index_to_be_removed==-1)
    console.log('error in finding index');
  else{
    tasks.splice(index_to_be_removed,1);
    fs.writeFile('./public/to_do_list.json',JSON.stringify(tasks,null,4),function(err){
      console.log(err);
    });
  }
  res.render('./to-do.html');
});

router.get('/newtask',function(req,res){
  console.log('inside adding new task');
  //redirect to new html page to add new task
  res.render('add-task.html');
});

router.post('/addtask',function(req,res){
  var task_to_be_added = req.body.task_name_field;
  var task_desc = req.body.task_description_field;
  var obj = {name:task_to_be_added,description:task_desc};
  if(_.findIndex(tasks,obj)==-1){
    tasks.push(obj);
    console.log(tasks);
    fs.writeFile('./public/to_do_list.json',JSON.stringify(tasks,null,4),function(err){
      console.log(err);
    })
  }else {
    console.log('already present');
  }
  res.redirect('/');
});
module.exports = router;
