//Variable to contain all students
var studentsArray = [];
//Variable to conatiner all teachers
var teachersArray = [];
//Variable to contain all streams id
var streams = [];
//Variable to contain subjects and their streams
var subjects = [];
//Variable to contain the tests done
var testsDone = [];
$("document").ready(function () {
    //Fecth all teachers and add them to and array and make a table using the array
    fetch(1);
    //fetch all student and add them to an array and add them to select option list using the student's array
    fetch(2);
    //Fetch all streams id
    fetch(3);
    //Fetch all subjects and their grades
    fetch(4);
    fetch(5);
    $("#tab1").click(function () {
        $("#two").hide();
        $("#three").hide();
        $("#one").css('display', 'block');
    })
    $("#tab2").click(function () {
        $("#one").hide();
        $("#three").hide();
        $("#two").css('display', 'block');
    })
    $("#tab3").click(function () {
        $("#one").hide();
        $("#two").hide();
        $("#three").css('display', 'block');
        //Append the grades in the select grade input when user clicks on the marks tab
        //console.log(1)
        marks();
        //        $("#marksSubject").html('<option></option>').append(streamsOptions());
    })
    $("#searchStudent").on("change", function () {
        //console.log($(this)/*.find("selected:option").attr("value")*/)
        var position = $("#searchStudent").select2('val');
        console.log(position)
        var studentSelected = studentsArray[position];
        var studentInfoTemplate = "";
        var studentSelectedImage = studentSelected['image'];
        if (studentSelectedImage == "") {
            studentSelectedImage = "src/img/user.png";
        }
        var studentSelectedName = studentSelected['name'];
        var studentSelectedDOB = studentSelected['DOB'];
        var studentSelectedEmail = studentSelected['email'];
        var studentSelectedGrade = studentSelected['stream']['grade'] + ' ' + studentSelected['stream']['stream'];
        studentInfoTemplate += "<center><img id='studentImage' src='" + studentSelectedImage + "'></center>";
        studentInfoTemplate += "Name : <input type='text' id='studentInfoName'  value='" + studentSelectedName + "'></br>";
        studentInfoTemplate += "DOB : <input type='date' id='studentInfoDOB'  value='" + studentSelectedDOB + "'></br>";
        studentInfoTemplate += "Grade : ";
        studentInfoTemplate += "<select id='studentInfoGrade'>";
        studentInfoTemplate += "<option value='" + studentSelected['id'] + "'>" + studentSelectedGrade + "</option>"
        studentInfoTemplate += "<option></option>"
        studentInfoTemplate += streamsOptions();
        studentInfoTemplate += "</select>";
        studentInfoTemplate += "<div id='msgBoard'></div>"
        $("#info").html(studentInfoTemplate);
        //Add listeners for change in student info
        $("#studentInfoName").change(() => {
            // console.log(1)
            //$("document").click(() => {
            save(2, studentSelected['id'], 'name', $("#studentInfoName").val());
            //console.log(1)
            //})
        })
        $("#studentInfoGrade").change(() => {
            //$("body").click(() => {
            console.log(1)
            save(2, studentSelected['id'], 'grade', $("#studentInfoGrade").val());
            //})
        })
        $("#studentInfoDOB").change(() => {
            //$("document").click(() => {
            console.log(1)
            save(2, studentSelected['id'], 'dob', $("#studentInfoDOB").val());
            //})
        })
    })
    $("#addStudentButton").click(() => { showStudentForm() });
    //$("#addTeacherButton").click(() => { showStaffForm() });
    /*$("#studentChangeListener").change(()=>{
        $("document").click(()=>{
            if($(this))
        })
    })*/


})
//Fetch all students and place them in array
function fetch(what) {
    if (what == 1) {
        var url = "modules/fetch.php?allteachers=";
    }
    if (what == 2) {
        var url = "modules/fetch.php?allStudents=";
    }
    if (what == 3) {
        var url = "modules/fetch.php?streams=";
    }
    if (what == 4) {
        var url = "modules/fetch.php?subjects=";
    }
    if (what == 5) {
        var url = "modules/fetch.php?tests=";
    }
    $.ajax({
        url: url,
        method: "get",
        success: function (data) {
            if (data != "") {
                if (what == 1) {
                    fetchedTeachers(data);
                }
                if (what == 2) {
                    fetchedStudents(data);
                }
                if (what == 3) {
                    fetchedStreams(data);
                }
                if (what == 4) {
                    fetchedSubjects(data);
                }
                if (what == 5) {
                    fetchedtests(data);
                }
            }

        }
    });
}



//add students to search form
function addToForm() {
    /*var options = "<option value=''></option>";
    for (var i = 0; i < studentsArray.length; i++) {
        options += "<option value='" + i + "'>" + studentsArray[i]['name'] + "</option>";

    }
    $("#searchStudent").html("");
    $("#searchStudent").append(options);*/
    /*/Integrating select2 in options
    $("#searchStudent").select2({
        placeholder: "Search student"
    });*/
    for (var i = 0; i < studentsArray.length; i++) {
        $("#searchStudent").select2({
            data: [
                { id: i, text: studentsArray[i]['name'] + " " },
                //subjects_gradeOptions()

            ]
        });
    }
}
//Function to fire when students have been fetched
function fetchedStudents(data) {
    studentsArray = JSON.parse(data);
    addToForm();
}
function fetchedSubjects(data) {
    subjects = JSON.parse(data);
}
//Function to fire when teachers have been fetched
function fetchedTeachers(data) {
    teachersArray = JSON.parse(data);
    makeTeachersTable(teachersArray);
}
//Function to fire when streams have been fetched
function fetchedStreams(data) {
    streams = JSON.parse(data);
}
function fetchedtests(data) {
    testsDone = JSON.parse(data);
}
function makeTeachersTable(array) {
    var teacherTableTemplate = "<button id='addTeacherButton'>Addd</button>";
    teacherTableTemplate += "<table id='teachersTable'><tr><th>#</th><th>Name</th><th>Email</th><th>Job</th></tr>";
    var number = 0;
    for (var i = 0; i < array.length; i++) {
        teacherTableTemplate += "<tr>";
        number = i + 1;
        teacherTableTemplate += "<td>" + number + "</td>";
        teacherTableTemplate += "<td>" + array[i]['name'] + "</td>";
        teacherTableTemplate += "<td>" + array[i]['email'] + "</td>";
        if (array[i]['type'] == 1) {
            var jobTitle = "Dean";
        }
        if (array[i]['type'] == 2) {
            var jobTitle = "Teacher";
        }
        teacherTableTemplate += "<td>" + jobTitle + "</td>";
        teacherTableTemplate += "</tr>";

    }
    teacherTableTemplate += "</table>"
    $("#two").html("");
    $("#two").append(teacherTableTemplate);
    //add a listener for click on add button
    $("#addTeacherButton").click(() => { showStaffForm() });
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
}
function showStaffForm() {
    var form = "<div id='addTeacherModal' class='modal'><form id='addStaffForm'>\
    <h4>Name</h4><input type='text' name='name' id='staffName' required>\
    <h4>Email</h4><input type='email' name='email' id='staffEmail'>\
    <h4>Telephone</h4>\
    <input type='number' name='tel' id='staffTel'>\
    <h4>Type</h4>\
    <select id='staffType'>\
    <option value='1'>Dean</option>\
    <option value='2'>Teacher</option></select><br>\
    <button id='cancelStaffForm'>Cancel</button>\
    <button type='submit' id='addStaff'>Add</button></form></div>";
    $('body').append(form);
    //These are here becuse they work only when the form is in the DOM but wheb when the oage loads it is not here, that is why it does not work any where else
    //Make the teacher form disappear when clicked on cancel button
    $("#cancelStaffForm").click(() => {
        event.preventDefault();
        $("#addTeacherModal").remove();
    })
    $("#staffType").change(() => {
        if ($("#staffType").val() == 2) {
            $("#staffType").after("<select style='float:clear' id='grade'\
            data-placeholder='Subject(s)'\
            name='subjects[]' \
            multiple class='select-subjects'><select>");
            //$(".multipleGrades").select2();
            /*$(".multipleGrades").change(() => {
                console.log($(".multipleGrades").select2('data'));
            })*/
            $("#grade").select2({
                data: [
                    //{ id: '', text: ' ' },
                    subjects_gradeOptions()]
            });
        }
        if ($("#staffType").val() == 1) {
            $("#grade").remove();
            $(".select2-container").remove();
        }

    })
    //Submit the add student form
    $("#addStaff").click(() => {
        event.preventDefault();
        var name = $("#staffName").val();
        var type = $("#staffType").val();
        var email = $("#staffEmail").val();
        var tel = $("#staffTel").val();
        var grade = $("#grade").select2('val')//values()//data('option-array-index');
        console.log(grade);
        //var DOB = $("#studentDOB").val();
        var validName, validType, validGrade;
        if (name == "") {
            alert("Please enter a name");
        }
        else {
            validName = true;
        }
        if (type == "") {
            alert("Please enter a type");
        }
        else {
            validType = true;
        }
        if ($("#staffType").val() == 2) {
            //Check that a grade(s) was provided for the teacher to teach
            if ($("#grade").select2('val') == null) {
                alert("Please enter a grade");
            }
            else {
                validGrade = true;
            }
        }

        /*if (DOB == "") {
            alert("Please enter a date of birth");
        }
        else {
            validDOB = true;
        }*/
        if (validName == true && validType == true) {
            var info = new FormData();
            info.append('name', name);
            info.append('type', type);
            info.append('email', email);
            info.append('tel', tel);
            if ($("#staffType").val() == 2) {
                info.append('grade', grade);
            }
            //info.append('DOB', DOB);
            //If adding teacher, a grade must be provided
            //If staff is teacher handler
            if ($("#staffType").val() == 2) {
                add(1, info);
            }
            //If staff is dean handler
            if ($("#staffType").val() == 1) {
                add(1, info);
            }
            //console.log(info)
        }
        /*else {
            $("#addStudent").unbind('click');
        }*/

    })

}
function add(who, info) {
    if (who == 1) {
        var url = "modules/insert.php?staff=";
    }
    if (who == 2) {
        var url = "modules/insert.php?student=";
    }
    /*for(var pair of info.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
     }*/
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: info,
        success: (data) => {
            if (who == 1) {
                insertMsg(1, data);
            }
            if (who == 2) {
                insertMsg(2, data);
            }
        }
    });
}
function insertMsg(who, msg) {
    if (who == 1) {
        var person = "Staff";
    }
    if (who == 2) {
        var person = "Student";
    }

    if (msg == "ko") {
        alert("Failed to insert " + person);
    }
    if (msg == "ok") {
        alert(person + " successfully inserted");
        if (who == 1) {
            $("#addTeacherModal").remove();
            fetch(1);
        }
        if (who == 2) {
            $("#addStudentModal").remove();
            fetch(2);
        }
    }

}
function streamsOptions() {
    var optionsTemplate = "";
    for (var i = 0; i < streams.length; i++) {
        optionsTemplate += "<option value='" + streams[i]['id'] + "'>Grade " + streams[i]['grade'] + ' ' + streams[i]['stream'] + "</option>";
    }
    return optionsTemplate;
}
function save(who, id, what, as) {
    if (who == 2 && what == 'name') {
        var url = "modules/update.php?student_name=&id=" + id + "&name=" + as;
    }
    if (who == 2 && what == 'grade') {
        var url = "modules/update.php?student_grade=&id=" + id + "&grade=" + as;
    }
    if (who == 2 && what == 'dob') {
        var url = "modules/update.php?student_dob=&id=" + id + "&dob=" + as;
    }
    $.ajax({
        url: url,
        method: "get",
        success: function (msg) {
            if (who == 2) {
                saveMsgResponse(2, msg)
            }

        }
    });
}
function saveMsgResponse(who, msg) {
    var successMsg = "<span id='saveSuccess'><br>Data saved</span>";
    var failureMsg = "<span id='saveFail' style='display:none'><br>Failed to save data</span>";
    if (who == 2 && msg == "ok") {
        $("#msgBoard").html("");
        $("#msgBoard").append(successMsg);
        $("#saveSuccess").fadeIn().delay(2000).fadeOut();
        //Update the students' array
        fetch(2)
        //$("#saveSuccess").remove();
    }
}
/*function subjects_gradeOptions() {
    var options = "";
    for (var i = 0; i < subjects.length; i++) {
        //var position=subjects[i]['stream'];
        var stream = "";//streams[i][position];
        for (var h = 0; h < streams.length; h++) {
            if (streams[h]['id'] == subjects[i]['stream']) {
                stream = streams[h]['grade'] + " " + streams[h]['stream']
                break;
            }
        }
        options += "<option id='" + subjects[i]['id'] + "'>" + subjects[i]['name'] + " " + stream + "</option>"
    }
    return options;
}*/
function subjects_gradeOptions() {
    //var array = "";
    for (var i = 0; i < subjects.length; i++) {
        //var position=subjects[i]['stream'];
        var stream = "";//streams[i][position];
        for (var h = 0; h < streams.length; h++) {
            if (streams[h]['id'] == subjects[i]['stream']) {
                stream = streams[h]['grade'] + " " + streams[h]['stream']
                break;
            }
        }
        /*array += "{";
        array += "id:";
        array += subjects[i]['id'];
        array += ",";
        array += "text:'";
        array += subjects[i]['name'] + " " + stream;
        array += "'},";*/
        $("#grade").select2({
            data: [
                { id: subjects[i]['id'], text: subjects[i]['name'] + " " + stream },
                //subjects_gradeOptions()

            ]
        });
    }
    //return array;
}

//Marks
//Append all grades to form
function marks() {
    $("#marksGrade").html('<option></option>').append(streamsOptions());
    $("#marksGrade").change(() => {
        //console.log(1)
        //If change grade clear all fields
        $("#marksSubject").html('');
        $("#marksTest").html('');
        var streamId = $("#marksGrade").find("option:selected").attr('value');
        //console.log(streamId)
        var option = "<option></option>";
        for (var i = 0; i < subjects.length; i++) {

            if (subjects[i]['stream'] == streamId) {
                option += "<option value='" + subjects[i]['id'] + "'>" + subjects[i]['name'] + "</option>"
            }
        }
        $("#marksSubject").html('').append(option);
        $("#marksSubject").change(() => {
            //If change subject clear the tests field
            $("#marksTest").html('');
            var subjectId = $("#marksSubject").find('option:selected').attr('value');
            var option = "<option></option>";
            for (var i = 0; i < testsDone.length; i++) {

                if (testsDone[i]['subject'] == subjectId) {
                    option += "<option value='" + testsDone[i]['id'] + "'>" + testsDone[i]['name'] + "</option>"
                }
            }
            $("#marksTest").html('').append(option);
 
                $("#viewResults").click(() => {
                    event.preventDefault();
                    var subject = $("#marksSubject").find('option:selected').attr('value');
                    var grade = $("#marksGrade").find('option:selected').attr('value');
                    var test = $("#marksTest").find('option:selected').attr('value');
                    var formData = {
                        subject: subject,
                        grade: grade,
                        test: test
                    }

                    $.ajax({
                        url: "modules/fetch.php",
                        method: "post",
                        data: formData,
                        success: function (data) {
                            appendMarks(data);
                        }
                    })
                })
         
        })
    })
}
function appendMarks(json) {
    if (json !== "") {
        var jsonArray = JSON.parse(json);
        var tableTemplate = "<table><tr><th>#</th><th>Name</th><th>Marks</th></tr>";
        var i = 0;
        for (i = 0; i < jsonArray.length; i++) {
            tableTemplate += "<tr>";
            tableTemplate += "<td>" + jsonArray[i]['id'] + "</td>";
            tableTemplate += "<td>" + jsonArray[i]['name'] + "</td>";
            tableTemplate += "<td><input class='mark' id='"+jsonArray[i]['id']+"' value=" + jsonArray[i]['marks'] + "></td>";
            tableTemplate += "</tr>";
            console.log(jsonArray[i]);
        }
        tableTemplate += "</table>";
        $("#results").html("");
        $("#results").append(tableTemplate);
        $(".mark").change(()=>{
            var studentId=event.target.attr('id')
            console.log(studentId)
            //saveMark(studentId,marks)
        })
        //console.log(tableTemplate)
    }
}