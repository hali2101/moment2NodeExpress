"use strict";

let baseURL = "http://localhost:3000/courses/";

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function(){ 
//
// Read and publish all courses 
    let url = baseURL;
    //get the data from db
    fetch(url, {method: 'GET'})
        .then(response => response.text())
        .then(data => {
                
                let jsonData = JSON.parse( data );

                let s = "<div id=resptable><table><th>ID</th><th>Kurskod</th><th>Kursnamn</th><th>Kursperiod</th><th>Ta bort kurs</th>";
                for(let i=0; i < jsonData.length; i++){
                
                //save data in different variables for cleaner output
                let id = jsonData[i]._id;
                let courseid = jsonData[i].courseId;
                let coursename = jsonData[i].courseName;
                let courseperiod = jsonData[i].coursePeriod;

                    s += `<tr><td>${id}</td><td>${courseid}</td><td>${coursename}</td><td>${courseperiod}</td><td><button class=erase id=${id}>Radera</button></td></tr>`;
                    
                }
                s += "</table></div>";

                document.getElementById("courselist").innerHTML = s;
             })
        .catch(error => {
            alert('There was an error '+error);
        });

//
// Create event handler for delete course
document.getElementById("courselist").addEventListener("click", function(e){
    let url = baseURL + e.target.id;
    //Delete a course depending on ID
    fetch(url, {method: 'DELETE'})
        .then(response => response.text())
        .then(data => {
                //reaload the page with new content
                location.reload();
             })
        .catch(error => {
            alert('There was an error '+error);
        });
});

});