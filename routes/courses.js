var express = require('express');
var router = express.Router();

//object with a courselist
var courses = [{ "_id": 1, "courseId": "DT162G", "courseName": "Javascript-baserad webbutveckling", "coursePeriod": 1 },
  { "_id": 2, "courseId": "IK060G", "courseName": "Projektledning", "coursePeriod": 1 },
  { "_id": 3, "courseId": "DT071G", "courseName": "Programmering i C#.NET", "coursePeriod": 2 },
  { "_id": 4, "courseId": "DT148G", "courseName": "Webbutveckling för mobila enheter", "coursePeriod": 2 },
  { "_id": 5, "courseId": "DT102G", "courseName": "ASP.NET med C#", "coursePeriod": 3 },
  { "_id": 6, "courseId": "IG021G", "courseName": "Affärsplaner och kommersialisering", "coursePeriod": 3 },
  { "_id": 7, "courseId": "DT069G", "courseName": "Multimedia för webben", "coursePeriod": 4 },
  { "_id": 8, "courseId": "DT080G", "courseName": "Självständigt arbete", "coursePeriod": 4 }]


/* GET complete courses listing. */
router.get('/', function(req, res, next) {

	for(var i=0; i < courses.length; i++){
		console.log(courses[i].name);    
	} 
	var jsonObj = JSON.stringify(courses);
	res.contentType('application/json');
	res.send(jsonObj);
});

/* GET single course with ID */
 router.get('/:id', function(req, res, next) {

	var id = req.params.id;
	var ind = -1;

	for(var i=0; i < courses.length; i++){
		if(courses[i]._id == id) ind = i; // Find the array index that holds _id = id   
	} 
	console.log(courses[ind]);
	res.contentType('application/json');
	res.send(ind>=0?courses[ind]:'{}'); // If we find the user id then return the course object otherwise return {}
 });

 /* DELETE course with unique ID */
 router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	var del=-1;

	for(var i=0; i < courses.length; i++){
		if(courses[i]._id == id) del = i; // Find the array index that holds _id = id    
	} 
	if(del>=0) status=courses.splice(del, 1); // Delete element and fix array

	res.contentType('application/json');
	res.send(id);
});

module.exports = router;
