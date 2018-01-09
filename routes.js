const express = require('express');
const router = express.Router();
const Feedbacks = require('./models/feedbacks');
const News = require('./models/news');

router.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html');
});

router.get('/index.html',function(req, res){
  res.sendFile(__dirname + '/index.html');
});

router.get('/Feedback.html',function(req, res){
  res.sendFile(__dirname + '/Feedback.html');
});

router.get('/Admin.html',function(req, res){
  res.sendFile(__dirname + '/Admin.html');
});

router.get('/Feedback.html',function(req, res){
  res.sendFile(__dirname + '/Feedback.html');
});

router.get('/NewsBS.html',function(req, res){
  res.sendFile(__dirname + '/NewsBS.html');
});

router.get('/Curriculum.html',function(req, res){
  res.sendFile(__dirname + '/Curriculum.html');
});

//get a list of feedbacks from database
router.get('/feedback', function(req, res){
	Feedbacks.find({}).then(function(feedbacks){
		res.send(feedbacks);
		}, function(err){
		console.log("Error");
	});
});

//add a new feedback to database
router.post('/feedback', function(req,res){
	Feedbacks.create(req.body).then(function(feedbacks){
			res.send(feedbacks);
	});
});

router.get('/news', function(req, res){
	News.find({}).then(function(news){
		res.send(news);
	}, function(err){
		console.log("Error");
	});
});

router.post('/news', function(req,res){
	News.create(req.body).then(function(news){
			res.send(news);
	});
});

module.exports = router;
