var express = require("express");
var router = express.Router();
const axios = require('axios')
var qs = require('qs');
 
router.post('/auth', function(req, res){
    const headers = {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    };

    const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'amzn1.application-oa2-client.e30840f307d04178ace54d3bbdf6465e',
        client_secret: '2bc9b63f04294343e9a42623256d29437107f6889587ca6eb27dec593260ed3a',
        scope: 'alexa::proactive_events'
    });

    axios.post('https://api.amazon.com/auth/o2/token', data, {
        headers: headers
    })
    .then((response) => {
        res.status(response.status).send(response.data.access_token)
    })
    .catch((error) => {
        res.status(500).send("Error")
    })
});

router.post('/postevent', function (req, res) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + req.body.token
    }
    var d1 = new Date()
    var startTime = d1.toISOString().slice(0, -5)
    d1.setHours(d1.getHours() + 8);
    var endTime = d1.toISOString().slice(0, -5)

    const name = req.body.visitor;

    const msg = "Smart Door - " + name + " is at the door"

    var data = {
        "timestamp": startTime,
        "referenceId": "id2",
        "expiryTime": endTime,
        "event": {
            "name": "AMAZON.WeatherAlert.Activated",
            "payload": {
                "weatherAlert": {
                    "source": "localizedattribute:source",
                    "alertType": "EMERGENT_WAVE"
                }
            }
        },
        "localizedAttributes": [
            {
                "locale": "en-US",
                "source": msg
            }
        ],
        "relevantAudience": {
            "type": "Multicast",
            "payload": {}
        }
    }

    axios.post('https://api.amazonalexa.com/v1/proactiveEvents/stages/development', data, {
        headers: headers
    })
    .then((response) => {
        res.status(response.status).send(response.status)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).send("Error")
    })
});

module.exports = router;