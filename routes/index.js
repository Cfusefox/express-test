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

router.post('/ggg', function(req, res, next) {
  const Inventory = mongoose.model('Inventory')
  var inventory1 = new Inventory({ "sku" : "almonds", "product": "product 1", "instock" : 120 })
  var inventory2 = new Inventory({  "sku" : "bread1",  "product": "product 2", "instock" : 80 })
  var inventory3 = new Inventory({"sku" : "bread2",  "product": "product 2", "instock" : 80 })
  var inventory4 = new Inventory({"sku" : "pecans1", "product": "product 4", "instock" : 70 })
  var inventory5 = new Inventory({"sku" : "pecans2", "product": "product 4", "instock" : 70 })
  inventory1.save()
  inventory2.save()
  inventory3.save()
  inventory4.save()
  inventory5.save()
  const Product = mongoose.model('Product')
  var product1 = new Product({"product": "product 1", description: "金玉满堂1" })
  var product2 =  new Product({"product": "product 2", description: "招财进宝"})
  var product3 =  new Product({"product": "product 4", description: "杨柳依依"})
  product1.save()
  product2.save()
  product3.save()
})

router.get('/test', (req, res, next) => {
  const Inventory = mongoose.model('Inventory')
  const Product = mongoose.model('Product')
  const result = Product.aggregate([
    {
      $lookup:
        {
          from: "inventories",
          localField: "product",
          foreignField: "product",
          as: "inventory_docs"
        }
   },
   { $match : { "description" : "金玉满堂1", "product" : "product 1" } },
   {
    $project: {
      "product": 1,
      "description": 1,
       inventory_docs: {
          $filter: {
             input: "$inventory_docs",
             as: "item",
            cond: { $eq: [ "$$item.instock", "80" ] }
          }
       }
    }
     }
  ], (err, docs) => {
    if (err) {
      return;
    }
    res.json(docs)
  })
})

module.exports = router;
