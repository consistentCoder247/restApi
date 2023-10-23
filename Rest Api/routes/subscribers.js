const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

//mongoose model
const Subscriber = require("../models/subscriber");



//RESTful endpoints
// get, post, put, delete

// getting all
router.get("/", async (req,res) => {
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch(err) {
        //error on server 
        res.status(500).json({message: err.message});
    }

})


// creating one
router.post("/", async (req,res) => {
//create new subscriber

const subscriber = new Subscriber({

    name: req.body.name,
    subscribedToChannel:req.body.subscribedToChannel
    });
    try {
        
        const newSubscriber = await subscriber.save();
        //201: successful creation of new subscriber
res.status(201).json(newSubscriber);
    }
    catch(err) {
        // 400: user not validated , no I/P provided in the required(*) fields
        res.status(400).json({message: err.message});
    }

});

// getting one
router.get("/:id", getSubscriber,  (req,res) => {
    const subscriber =  res.subscriber;
    res.send(subscriber.name);
})

// updating one
router.patch("/:id", getSubscriber, async (req,res) => {
 if(req.body.name != null) {
    res.subscriber.name = req.body.name;
 }
 if(req.body.subscribedToChannel != null){
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
 }
 try{
 const sub = await res.subscriber.save();
 res.json(sub);

 }
 catch(err) {
res.status(400).json({message: err.message});
 }
})
// deleting one 
router.delete("/:id",  async (req,res) => {
    try {
// const subscriber = await Subscriber.findById(req.params.id);

// if(subscriber == null) {
//     res.status(404).json({message: " Subscriber not  found"});
// }

 await Subscriber.deleteOne({_id: req.params.id});
res.json({message: "Deleted Successfully"});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
   
})

//Middleware to get subscriber matching the id

async function getSubscriber (req,res,next) {
    
    try{
 const subscriber = await Subscriber.findById(req.params.id);
if(subscriber == null) {
    // implies no subscriber matching id => subscriber not found => 404 status code
   return res.status(404).json({message: "Subscriber not found"});
}
    res.subscriber = subscriber;
    }
    catch(err) {
   return res.status(500).json({message: err.message})
    }
    
    next();
}
module.exports = router;