

const redis = require('redis')
const express = require('express'); 
const app = express(); 
const port = 3001
const connect = require('./Connection')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

  app.get('/basket/getBasket/:uuid', (req, res) => { 
    connect.createConnection().then(client => {
        client.hgetall(req.params.uuid, (err, results) => {
            if(results){
               res.json({basket:JSON.parse(results.basket)})
            }else{
                res.send(err)
            }
        })
        client.quit((err, reply) => {
            if(!err){
                console.log(reply)
            }else{
                console.log(err)
            }
        })
    })
  }); 
  app.post('/basket/addItem',jsonParser, (req, res) => { 
    connect.createConnection().then(client => {
        const basket = JSON.stringify(req.body.basket)
        const uuid = req.body.uuid
        
        client.hset(uuid, "basket", basket, redis.print)
        client.hgetall(uuid, (err, results) => {
            if(results){
                res.send(results)
            }else{
                res.send(err)
            }
        })
    
    })
   })


 
    

  app.listen(port, () => { 
    console.log('Example app listening on port!'); 
  });