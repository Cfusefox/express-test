var express = require('express');
var router = express.Router();
const db = require('../database')
const mongoose = require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', function(req, res, next) {
  console.log(req)
  const Article = mongoose.model('Article')
  var art = new Article({
    title: 'node',
    content: 'test'
  })
  art.save((err) => {
    if(err) {
      res.json(err)
    } else {
      res.json("success")
    }
  })
})

router.put('/update', (req, res, next) => {
  const Article = mongoose.model('Article')
  Article.updateMany(
    {'title': 'node'},
    {'title': 'node.js'},
    (err, docs) => {
      if(err){return res.json('更新数据失败')}
      res.json(docs);
    }
  )
})

router.get('/find', (req, res, next) => {
  const Article = mongoose.model('Article')
  Article.find({}, (err, docs)=>{
    if(err){
        res.json(err);
        return;
    }
    res.json(docs)
  })
})

router.delete('/delete', (req, res, next) =>{
  const Article = mongoose.model('Article')
  Article.deleteOne(
    {'title': 'node'}, //查找条件
    /*回调函数*/
    (err,docs)=>{
        if(err){return res.json('删除数据失败')}
        res.json(docs);
    }

)
})

module.exports = router;
