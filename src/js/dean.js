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
var periods = [];
var currentYearId, currentYear, currentPeriodId, currentPeriod;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
$(document).ready(function () {
    fetch(6)
    //Fecth all teachers and add them to and array and make a table using the array
    fetch(1);
    //fetch all student and add them to an array and add them to select option list using the student's array
    fetch(2);
    //Fetch all streams id
    fetch(3);
    //Fetch all subjects and their grades
    fetch(4);
   
    $("#tab1").click(function () {
        $("#two").hide();
        $("#three").hide();
        $("#one").css('display', 'block');
        //$(this).off('click');
    })
    $("#tab2").click(function () {
        $("#one").hide();
        $("#three").hide();
        $("#two").css('display', 'block');
        //$(this).off('click')

    })

    $("#tab3").unbind('click').click(function () {
        $("#one").hide();
        $("#two").hide();
        $("#three").css('display', 'block');
        //Append the grades in the select grade input when user clicks on the marks tab
        //console.log(1)
        marks();
        //$(this).off('click')
        return false;
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
        var url = "modules/fetch.php?tests="+currentPeriodId;
    }
    if (what == 6) {
        var url = "modules/fetch.php?periods=";
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
                if (what == 6) {
                    fetchedPeriods(data);
                }
            }

        }
    });
}
function fetchedPeriods(json) {
    periods = JSON.parse(json);
    setCurrentPeriod();
    appendToSelectTerm();
    generateTermOptions('termOptions')
     //Fetch tests in current period
     fetch(5);
    return false;
}
function appendToSelectTerm() {
    $('#termOptions').select2({
        data: {

        }
    })
    return false;
}
function generateTermOptions(idOfElement) {
    for (var i = 0; i < periods.length; i++) {
        var position = periods[i]['periods'];
        //var periods = "";//streams[i][position];
        var terms;
        for (var h = 0; h < position.length; h++) {
            //if (streams[h]['id'] == subjects[i]['stream']) {
            var periodName = position[h]['name']

            var newOption = new Option(periods[i]['year'] + " " + periodName, position[h]['id'], false, false);
            $('#' + idOfElement).append(newOption)
            console.log(position[h]['id'])

        }

    }
}
function setCurrentPeriod() {
    var positionInArray;
    for (var h = 0; h < periods.length; h++) {
        currentYearId = periods[h]['id'];
        currentYear = periods[h]['year'];
        positionInArray = h;
        //console.log(currentYear)
    }
    var arrayOfPeriods = periods[positionInArray]['periods'];

    for (var i = 0; i < arrayOfPeriods.length; i++) {
        currentPeriodId = arrayOfPeriods[i]['id'];
        currentPeriod = arrayOfPeriods[i]['name'];

    }
    return false;
}

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
function fetchedSubjects(data) {
    subjects = JSON.parse(data);
    return false;
}
//Function to fire when teachers have been fetched
function fetchedTeachers(data) {
    teachersArray = JSON.parse(data);
    makeTeachersTable(teachersArray);
    return false;
}
//Function to fire when streams have been fetched
function fetchedStreams(data) {
    streams = JSON.parse(data);
    return false;
}
function fetchedtests(data) {
    testsDone = JSON.parse(data);
    return false;
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
        return false;
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
            //$("#grade").select2({
            //data: [
            //{ id: '', text: ' ' },
            subjects_gradeOptions('grade')//]
            // });
        }
        if ($("#staffType").val() == 1) {
            $("#grade").remove();
            $(".select2-container").remove();
        }
        return false;
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
        var validName, valideEmail, validType, validGrade;
        if (name == "") {
            alert("Please enter a name");
        }
        else {
            validName = true;
        }
        if (email == "" || emailIsValid(email)!==true) {
            alert("Please enter an email");
        }
        else {
            valideEmail = true;
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
        if (validName == true && validType == true && valideEmail == true) {
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
        return false;
    })
    return false;
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
    return false;
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
    return false;
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
    return false;
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
    return false;
}

function subjects_gradeOptions(idOfElement) {
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

        $('#' + idOfElement).select2({
            data: [
                { id: subjects[i]['id'], text: subjects[i]['name'] + " " + stream },


            ]
        });
    }
    return false;
}

//Marks
//Append all grades to form
function marks() {
    $('#createAssessment').unbind('click').click(() => {
        showNewAssessmentForm()
        return false
    })
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

                if (subject !== "" && grade !== "" && test !== "" && test !== undefined) {
                    //if ($("#marksTest").has('option').length > 0 && $("#marksTest").find('option:selected').attr('value') !== "") {
                    var formData = {
                        subject: subject,
                        grade: grade,
                        test: test
                    }
                    console.log(test);
                    $.ajax({
                        url: "modules/fetch.php",
                        method: "post",
                        data: formData,
                        success: function (data) {
                            appendMarks(data);
                        }
                    })
                }
                return false;
            })
            return false;
        })
        return false;
    })
    return false
}
function appendMarks(json) {
    if (isJSON(json) && json !== "") {
        var jsonArray = JSON.parse(json);
        var tableTemplate = "<table><tr><th>#</th><th>Name</th><th>Marks</th></tr>";
        var i = 0;
        for (i = 0; i < jsonArray.length; i++) {
            tableTemplate += "<tr>";
            tableTemplate += "<td>" + jsonArray[i]['id'] + "</td>";
            tableTemplate += "<td>" + jsonArray[i]['name'] + "</td>";
            tableTemplate += "<td><input class='mark' id='" + jsonArray[i]['id'] + "' value=" + jsonArray[i]['marks'] + "></td>";
            tableTemplate += "</tr>";
            //console.log(jsonArray[i]);
        }
        tableTemplate += "</table>";
        $("#results").html("");
        $("#results").append(tableTemplate);

        //Function 

        $('.mark').on('blur', function () {
            var studentId = $(this).attr('id');
            var newMark = $(this).val();
            var msg = "<span id='saveMsg'>Data saved successfully</span>"
            var failMsg = "<span id='failedToSaveMsg'>Failed to save data</span>"
            $.ajax({
                url: "modules/update.php?marks=",
                method: "post",
                data: {
                    student_id: studentId,
                    mark: newMark,
                },
                success: function (data) {
                    if (data == "ok") {
                        console.log(msg)
                        $("#saveMsg").remove()
                        $("#results").append(msg);
                        $("#saveMsg").fadeIn().delay(2000).fadeOut();
                    }
                    if (data == "ko" || data == "") {
                        $("#failedToSaveMsg").remove()
                        $("#results").append(failMsg);
                        $("#failedToSaveMsg").fadeIn().delay(2000).fadeOut();
                    }
                }

            })
            return false;
        })
    }
    else {
        return false;
    }
    return false;
}
function showNewAssessmentForm() {
    var form = "";
    var form = "<div class='modal'>\
    <form id='newAssessmentForm'>\
    <h4>Subject</h4>\
    <select name='subject' id='subject'>\
    <option><option>\
    </select><br>\
    <h4>Type</h4>\
    <select name='type' id='type'><br>\
    <option value=''></option>\
    <option value='1'>Test</option>\
    <option value='2'>Exam</option>\
    </select><br>\
    <button id='cancel'>Cancel</button>\
    <button id='create'>Create</button>\
    </form>";
    $('body').append(form);
    subjects_gradeOptions('subject')
    //createMonthOptions('month');
    addListeners();
    return false;
}
function createMonthOptions(idOfElement) {
    for (var i = 0; i < months.length; i++) {
        $('#' + idOfElement).select2({
            data: [
                { id: i, text: months[i] },
                //subjects_gradeOptions()

            ]
        });
    }
    return false;
}
function addListeners() {
    $(document).on('click', '#cancel', () => {
        event.preventDefault();
        $('.modal').remove();
        return false;
    })
    $('#create').click(() => {
        event.preventDefault();
        validateAndsubmit();
        return false;
    })
    $(document).on('change', '#type', () => {
        console.log($('#type').val())
        if ($('#type').val() == 1) {
            $('#type').after("<div id='monthOptions'>\
            <h4>Month</h4>\
            <select name='month' id='month'>\
            <option><option>\
            </select>\
            </div>")
            createMonthOptions('month');
        }
        else {
            $('#monthOptions').remove();
        }
        return false;
    })
}
function validateAndsubmit() {
    var subject = $('#subject').val();
    var type = $('#type').val();
    var month;
    var validSubject, validType, validMonth
    if (type == 1) {
        month = $('#month').val();
    }
    if (subject == "") {
        alert("Enter a subject");
    }
    else {
        validSubject = true;
    }
    if (type == "") {
        alert("Enter an assessment type");
    }
    else {
        validType = true;
    }
    if (type == 1) {
        if (month == "") {
            alert("Enter a month")
        }
        else {
            validMonth = true;
        }
    }
    if (validSubject == true && validType == true) {
        var form = new FormData();
        form.append('subject', subject);
        form.append('type', type);
        form.append('period', currentPeriodId);
        
        if (type == 1) {
            var number=parseInt(month,10)+1;
            var name="Test "+number;
            console.log(number)
            console.log(name);
            form.append('month', month);
            form.append('name', name);
        }
        else{
            form.append('name', 'Exam');
        }
        $.ajax({
            url: 'modules/insert.php?assessment=',
            method: "post",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data: form,
            success: function (data) {
                if (data == "ok") {
                    $(".modal").remove();
                }
                else {
                    alert("Failed to create assessement");
                }
            }
        })

    }
    return false;
}
function isJSON(something) {
    if (typeof something != 'string')
        something = JSON.stringify(something);

    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
}
function emailIsValid(email) {
    var regex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return regex.test(email);
}