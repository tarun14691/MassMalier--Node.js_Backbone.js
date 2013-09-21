var express = require('express');
	http = require('http');
	nodemailer = require("nodemailer");
var app = express()
			.use(express.bodyParser())
			.use(express.static('public'));
console.log('Server running at http://localhost:3000/');

app.get('/patients',function(req,res){
	
	 // do a POST request
	// create the JSON object
	// jsonObject = JSON.stringify({
		// "message" : "The web of things is approaching, let do some tests to be ready!",
		// "name" : "Test message posted with node.js",
		// "caption" : "Some tests with node.js",
		// "link" : "http://www.youscada.com",
		// "description" : "this is a description",
		// "picture" : "http://youscada.com/wp-content/uploads/2012/05/logo2.png",
		// "actions" : [ {
			// "name" : "youSCADA",
			// "link" : "http://www.youscada.com"
		// } ]
	// }); 
	 
	// prepare the header
	// var postheaders = {
		// 'Content-Type' : 'application/json',
		// 'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
	// };
	
	// the Get options
	var options = {
		host : 'patients.apiary.io',
		path : '/patients',
		method : 'GET'
		//headers : postheaders
	};

	var reqGet = http.get(options, function (http_res) {
		// initialize the container for our data
		var data = "";

		// this event fires many times, each time collecting another piece of the response
		http_res.on("data", function (chunk) {
			// append this chunk to our growing `data` var
			data += chunk;
		});

		// this event fires *one* time, after all the `data` events/chunks have been gathered
		http_res.on("end", function () {
			// you can use res.send instead of console.log to output via express
			getData = JSON.parse(data);
			//res.send('got request to fetch patient data' + getData.items[6].email);
			res.send(data);
			//res.send(data);
		});
		console.log('test');
	});
	reqGet.end();
	reqGet.on('error', function(e) {
		console.error(e);
	});
	
});

app.post('/sendPatMail',function(req,res){
	// create reusable transport method (opens pool of SMTP connections)
	//req = JSON.stringify(req);
	res.send("this is :" + req.body.rcpt);
	var smtpTransport = nodemailer.createTransport("SMTP",{
		service: "Gmail",
		auth: {
			user: "tarunblog",
			pass: "abcPassword"
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: "Tarun Kumar  <tarun@hashTecky.com>", // sender address
		to: req.body.rcpt, // list of receivers
		subject: req.body.subj, // Subject line
		text: req.body.body, // plaintext body
		html: "<b>"+req.body.body+"</b>" // html body
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
		}else{
			console.log("Message sent: " + response.message);
		}

		// if you don't want to use this transport object anymore, uncomment following line
		//smtpTransport.close(); // shut down the connection pool, no more messages
	});
	
});

app.get('/*',function(req,res){
	res.send('Got request to fetch patient data . Please use correct path');
});


app.listen(3000);