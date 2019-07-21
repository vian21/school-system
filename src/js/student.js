//add students to search form
function addToForm() {
    for (var i = 0; i < studentsArray.length; i++) {
        $("#searchStudent").select2({
            data: [
                { id: i, text: studentsArray[i]['name'] + " " },
                //subjects_gradeOptions()

            ]
        });
    }
    return false;
}
//Function to fire when students have been fetched
function fetchedStudents(data) {
    studentsArray = JSON.parse(data);
    addToForm();
    return false;
}

function showStudentForm() {
    var form = "<div id='addStudentModal' class='modal'><form enctype='multipart/form-data'><h4>Name :</h4><input type='text' name='name' id='studentName' required><h4>Student's email :</h4><input type='email' name='email' id='studentEmail'><h4>student's telephone number :</h4><input type='number' name='tel' id='studentTel'><h4>Grade :</h4><select name='grade' id='studentGrade' required><option value=''></option></select><h4>Date of birth:</h4><input type='date' name='DOB' id='studentDOB' required><br><button type='button' id='cancelStudentForm'>Cancel</button><button type='submit' id='addStudent'>Add</button></form></div>";
    $('body').append(form);
    //These are here becuse they work only when the form is in the DOM but wheb when the oage loads it is not here, that is why it does not work any where else
    //Make the student form disappear when clicked on cancel button
    $("#cancelStudentForm").click(() => {
        event.preventDefault();
        $("#addStudentModal").remove();
    })
    //Append streams in select
    $("#studentGrade").append(streamsOptions());
    //Submit the add student form
    $("#addStudent").click((event) => {
        event.preventDefault();
        var name = $("#studentName").val();
        var email = $("#studentEmail").val();
        var tel = $("#studentTel").val();
        var grade = $("#studentGrade").val();
        var DOB = $("#studentDOB").val();
        var validName, validGrade, validDOB;
        if (name == "") {
            alert("Please enter a name");
        }
        else {
            validName = true;
        }
        if (grade == "") {
            alert("Please enter a grade");
        }
        else {
            validGrade = true;
        }
        if (DOB == "") {
            alert("Please enter a date of birth");
        }
        else {
            validDOB = true;
        }
        if (validName == true && validGrade == true && validDOB == true) {
            var info = new FormData();
            info.append('name', name);
            info.append('email', email);
            info.append('tel', tel);
            info.append('grade', grade);
            info.append('DOB', DOB);
            add(2, info);
            //console.log(info)
        }
        /*else {
            $("#addStudent").unbind('click');
        }*/

    })
    return false;
}
