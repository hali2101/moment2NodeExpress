var express = require("express");
//creating an instance of the router
var router = express.Router();

const bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.use(bodyParser.json());

/******* Connect to database with mongoose ********/
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/myCV", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function (callback) {
  // Add the listener for db events
  console.log("Connected to db");

  // Create DB scheme
  var courseSchema = mongoose.Schema({
    courseid: String,
    coursename: String,
    progression: String,
    term: String,
    syllabus: String,
  });

  // Create scheme model
  var Course = mongoose.model("Course", courseSchema);

  /******* Get all courses ********/
  router.get("/", function (req, res, next) {
    // Läs ut från databasen
    Course.find(function (err, courses) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(courses);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });

  /******* GET single course with ID ********/
  router.get("/:id", function (req, res, next) {
    var id = req.params.id;

    Course.findById(id, function (err, courses) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(courses);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });

  /******* ADD new course to database-list ********/
  router.post("/", function (req, res, next) {
    // Create new course
    var coursebody = new Course({
      courseid: req.body.courseid,
      coursename: req.body.coursename,
      progression: req.body.progression,
      term: req.body.term,
      syllabus: req.body.syllabus,
    });

    console.log("test" + req.body.coursename);

    // Save course to database
    coursebody.save(function (err) {
      if (err) return console.error(err);
    });

    var jsonObj = JSON.stringify(coursebody);
    res.contentType("application/json");
    res.send(jsonObj);
  });

  /******* DELETE course with unique ID ********/
  router.delete("/:id", function (req, res, next) {
    var id = req.params.id;

    // Delete course with specific id from db
    Course.deleteOne({ _id: id }, function (err) {
      if (err) return handleError(err);
    });

    // Get the new courselist from db as response data
    Course.find(function (err, courses) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(courses);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });
});

module.exports = router;
