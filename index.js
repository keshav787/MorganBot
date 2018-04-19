'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());
console.log("Bahar")

var finalsendtext = ""
var FTC =  1
restService.post('/echo', function(req, res) {
    // var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    console.log("andar")
var speech
var date
var FTC =  1

//console.log(req.body.result);
//console.log(req.body.result.contexts);


if(req.body.result && req.body.result.parameters && req.body.result.parameters.echoText)
{
	//echoText.original
	console.log("received text....")
	console.log(req.body.result.contexts[0].parameters["echoText.original"]);
  //var sendtext = req.body.result.parameters.echoText.original ;
  
  var sendtext = req.body.result.contexts[0].parameters["echoText.original"];
  console.log("Send text is " + sendtext);
  request.post('http://35.194.34.163:8080/AbzWebserviceKiera/rest/UserService/users', {
      form: {
          message: sendtext,
          name: `Keshav Kumar`,
          datein: "2"
      }
  }, function(err, httpResponse, body) {
      date = body

if(FTC == 1 )
{
  if(date == "NA")
  {

    finalsendtext = finalsendtext.concat(" ").concat(sendtext)
	  speech = "When is the next meeting date?";
    console.log("First time message 111111111111111")
    console.log("No meeting date NOOOOOOOOOOOOOOOOOO")
    //Set first time counter to  0
    FTC = 0;
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'morgan-webhook'
    });
  }
  else {
    finalsendtext = finalsendtext.concat(" ").concat(sendtext)
    console.log("First time message 111111111111111")
    console.log("Has meeting date YESSSSSSSSSSSSSSSSS")
    console.log("Calling find store url ... final text is ")
    console.log(finalsendtext)
    request.post('http://35.194.34.163:8080/AbzWebserviceKiera/rest/UserService/users', {
        form: {
            message: finalsendtext,
            name: `Agent #`,
            datein: "0"
        }
    })
    speech = "Thanks for sharing your meeting notes. Do you want to see the analysis result?";
    FTC = 1;
    finalsendtext = ""
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'morgan-webhook'
    });
  }
}
else {
  if(date == "NA")
  {
    finalsendtext = finalsendtext.concat(" ").concat(sendtext)
    console.log("Repeated message 2222222222222222")
    console.log("No meeting date NOOOOOOOOOOOOOOOOOOOOOOOOOO")
    speech = "When is the next meeting date?";
    FTC = 0;
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'morgan-webhook'
    });
  }
  else {
    finalsendtext = finalsendtext.concat(" ").concat(sendtext)
    console.log("Repeated message 2222222222222222")
    console.log("has meeting date yesssssssssssssssssssssss")
    console.log("Calling find store url ... final text is ")
    console.log(finalsendtext)
    request.post('http://35.194.34.163:8080/AbzWebserviceKiera/rest/UserService/users', {
        form: {
            message: finalsendtext,
            name: `Agent #`,
            datein: "0"
        }
    })

    speech = "Thanks for sharing your meeting notes. Do you want to see the analysis result?";
    FTC = 1;
    finalsendtext = " "
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'morgan-webhook'
    });
  }

}



  });

}
else {

  speech = "Seems like some problem. Speak again." ;
  return res.json({
      speech: speech,
      displayText: speech,
      source: 'webhook-echo-sample'
  });
}


});

restService.listen((process.env.PORT || 8147), function() {
    console.log("Server up and listening");
});
