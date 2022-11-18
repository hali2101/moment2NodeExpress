var express = require('express');
//creating an instance of the router
var router = express.Router();

const fs = require('fs/promises');

/* GET complete courses listing. */
router.get('/', function(req, res, next) {

//read file and send parsed data
fs.readFile('courses.json', 'utf-8')
  .then((data) => {
      res.send(JSON.parse(data));
  })
  .catch((error) => {
    throw error; // Error 
  });
});

/* GET single course with ID */
 router.get('/:id', function(req, res, next) {

fs.readFile('courses.json', 'utf-8')
  .then((data) => {
	//parse to javascript object
	var courses = JSON.parse(data);

	var id = req.params.id;
	var ind = -1;

	for(var i=0; i < courses.length; i++){
		if (courses[i]._id == id)
		ind = i; // Find the array index that holds _id = id   
	} 
	console.log(courses[ind]);

	res.send(ind>=0?courses[ind]:'{}'); // If we find the user id then return the course object otherwise return {}
  })
  .catch((error) => {
    throw error; // Error 
  });

 });

 /* DELETE course with unique ID */
router.delete('/:id', function (req, res, next) {

	fs.readFile('courses.json', 'utf-8')
		.then((data) => {
			//parse to javascript object
			var courses = JSON.parse(data);
			//get id from parameter in url
			var id = req.params.id;
			var del = -1;

			for (var i = 0; i < courses.length; i++) {
				if (courses[i]._id == id) del = i; // Find the array index that holds _id = id    
			}
	
			if (del >= 0) stat = courses.splice(del, 1); // Delete element and fix array
			//save new list in variable
			var newCourseList = JSON.stringify(courses);
			//write new list to JSON-file
			fs.writeFile('courses.json', newCourseList, 'utf-8', function (err) {
				if (err) throw err;
				//Send response that registration was successfull and id.
				res.send(id);
				
	});
			
	//read file again an send OK message
	fs.readFile('courses.json', 'utf-8')
		.then((data) => {
			//send status-code and OK-message
			res.status(200).send({"message" : "Course has been deleted."});
  		})
  		.catch((error) => {
    		throw error; // Error 
  		});
	});
})

module.exports = router;
