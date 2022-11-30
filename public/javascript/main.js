"use strict";

let baseURL = "http://localhost:3000/courses/";

//getting dom-elements for manipulation
let msg = document.getElementById("msg");

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  //
  // Read and publish all courses
  let url = baseURL;

  //get the data from db
  fetch(url, { method: "GET" })
    .then((response) => response.text())
    .then((data) => {
      let jsonData = JSON.parse(data);

      let s =
        "<div id=resptable><table><th>Kurskod</th><th>Kursnamn</th><th>Progression</th><th>Kursperiod</th><th>Kurslänk</th><th>Ta bort kurs</th>";
      for (let i = 0; i < jsonData.length; i++) {
        //save data in different variables for cleaner output
        let id = jsonData[i]._id;
        let courseid = jsonData[i].courseid;
        let coursename = jsonData[i].coursename;
        let progression = jsonData[i].progression;
        let term = jsonData[i].term;
        let syllabus = jsonData[i].syllabus;

        s += `<tr><td>${courseid}</td><td>${coursename}</td><td>${progression}</td><td>${term}</td><td><a href=${syllabus} target="_blank">Länk till kursplan</a></td><td><button class=erase id=${id}>Radera</button></td></tr>`;
      }
      s += "</table></div>";

      document.getElementById("courselist").innerHTML = s;
    })
    .catch((error) => {
      alert("There was an error " + error);
    });

  //Post new course to database
  document
    .getElementById("newcourse")
    .addEventListener("submit", async function (e) {
      e.preventDefault(e);

      //hämta in från inputfälten
      let courseid = document.getElementById("courseid").value;
      let coursename = document.getElementById("coursename").value;
      let progression = document.getElementById("progression").value;
      let term = document.getElementById("term").value;
      let syllabus = document.getElementById("syllabus").value;

      //check if input is empty
      if (
        courseid != "" &&
        coursename != "" &&
        progression != "" &&
        term != "" &&
        syllabus != ""
      ) {
        //save as object
        let coursebody = {
          courseid: courseid,
          coursename: coursename,
          progression: progression,
          term: term,
          syllabus: syllabus,
        };
        //make fetch to post to database
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //stringify body to database
          body: JSON.stringify(coursebody),
        });
        //empty inputfields
        courseid = "";
        coursename = "";
        progression = "";
        term = "";
        syllabus = "";

        //page reload with new content
        location.reload();
      } else {
        msg.innerHTML =
          "Något gick fel, var god fyll i alla fält för att lägga till kurs.";
      }
    });

  // Create event handler for delete course
  document.getElementById("courselist").addEventListener("click", function (e) {
    let url = baseURL + e.target.id;
    //Delete a course depending on ID
    fetch(url, { method: "DELETE" })
      .then((response) => response.text())
      .then((data) => {
        //reload the page with new content
        location.reload();
      })
      .catch((error) => {
        alert("There was an error " + error);
      });
  });
});
