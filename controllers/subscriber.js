const subscribers = require('../models/subscribersSchema');
const webPush = require('web-push');


addSubscriber = function (req, res) {
    console.log("called");
    subscribers.find({email:req.body.email}, function(err, doc){
        if (err) {console.log('error');
            res.status(400).send({
                message: 'Bad request'
            });
        } else if (doc.length==0) {
            console.log('adding');
            subscribers.create(req.body, function (err, data) {
                if (err) {
                    console.log('bad request');
                    res.status(400).send({
                        message: 'Bad request'
                    });
                } else {
                    console.log('added');
                    res.status(200).send({
                        message: 'Subscribed'
                    });
                }
            });
        } else {
            console.log('checking');
            subscribers.findOneAndUpdate({email: req.body.email},{subscribed: true},function(err, docs, ress){
                if (err) {
                    res.status(400).send({
                        message: 'Bad request'
                    });
                } else {
                    res.status(200).send({
                        message: 'Subscribed'
                    });
                }
            })
        }
    })
    
}
unSubscribe = function (req, res) {
    subscribers.findOneAndUpdate({ email: req.body.email }, {subscribed: false}, function(err, doc, ress){
        if (err) {
            res.status(400).send({
                message: 'Bad request'
            });
        } else {
            res.status(200).send({
                message: 'Unsubscribed'
            });
        }
    })
}

subscribed = function (req, res) {
    console.log("subc");
    subscribers.find({ email: req.body.email, subscribed: true}, function(err, doc){
        if (err) {
            res.status(400).send({
                message: 'Bad request'
            });
        } else if (doc.length!=0) {
            res.status(200).send({
                status: true
            });
        } else {
            res.status(200).send({
                status: false
            });
        }
    } )
}

pushNotification = function (req, res) {
    const publicVapidKey = 'BLhKMSmKqPS_nrTkR02A-LgdYCLd2YTVDwHYdeDBDAQOyi7SfxKnM4BcVp5cuVWx48zqrmGAfL6VJwo9QsHKUNY';
    const privateVapidKey = 'p-aDwCJXi4BdB2EcXum_oJtP47bR5wM49_OKqEVI9zc';
    webPush.setVapidDetails('mailto:example@yourdomain.org', publicVapidKey, privateVapidKey);
    const body = req.body.value;
    const notificationPayload = {
        "notification": {
            "title": "Book My Room",
            "body": req.body.value,
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            }
            // ,
            // "actions": [{
            //     "action": "explore",
            //     "title": "Go to the site"
            // }]
        }
    }
    subscribers.find({subscribed: true}, function (err, docs) {
        if (err) {
            res.status(404).json(err);
        }
        else {
            let subs = [];
            for (let doc of docs) {
                subs.push(doc.sub);
            }
            for (let sub of subs) {
                webPush.sendNotification(sub, JSON.stringify(notificationPayload)).then(function () {
                    res.json("successful");
                }).catch((err) => {
                    res.json(sub);
                })
            }
        }
    })
}

module.exports = { addSubscriber, unSubscribe, pushNotification, subscribed};
