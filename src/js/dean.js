var schoolId;
var schoolName;
var schoolType;
var genders = ['Male', 'Female'];
var schoolTypes = ['Day School', 'Boarding School'];
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
var staffTypes = ['Dean', 'Teacher'];
//var currentYearPosition, currentYearId, currentYear, currentPeriodPosition, currentPeriodId, currentPeriod;
var currentPeriodId, currentPeriod;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
$(document).ready(function () {
    fetchThis(7)
    dashboard()
    //fetcth periods;
    fetchThis(6)
    //Fecth all teachers and add them to and array and make a table using the array
    //fetchThis(1);
    //fetch all student and add them to an array and add them to select option list using the student's array
    //fetchThis(2);
    //Fetch all streams id
    fetchThis(3);
    //Fetch all subjects and their grades
    fetchThis(4);
    //
    $("#tab1").click(function () {
        //$("#two").hide();
        //$("#three").hide();
        //$("#four").hide();
        //$("#one").css('display', 'block');
        //$(this).off('click');
        $("#container").html("<button id='addStudentButton'>Add</button>\
                                <select name='student' id='searchStudent'>\
                                  <option></option>\
                                </select>\
                             <div id='info'>\
                                 <center><img src='src/img/user.png' alt='' id='schoolImage'><br><br></center>\
                                <span>Name: "+ schoolName + "</span><br>\
                                <span>Number of students :"+ numberOfStudents + "</span><br>\
                                <span>Number of male students :"+ numberOfMaleStudents + "</span><br>\
                                <span>Number of female students :"+ numberOfFemaleStudents + "</span><br>\
                                <span>Country :Burundi</span><br>\
                                <span>Nationalities :5</span><br>\
                                <span>Number of teachers :"+ numberOfTeachers + "</span><br>\
                          </div>\
    ")
        addToForm();

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

            studentInfoTemplate += "Gender: <select id='studentInfoGender'>";
            studentInfoTemplate += "<option value='0'>Male</option>";
            studentInfoTemplate += "<option value='1'>Female</option>";
            studentInfoTemplate += "</select><br>";

            studentInfoTemplate += "DOB : <input type='date' id='studentInfoDOB'  value='" + studentSelectedDOB + "'></br>";
            studentInfoTemplate += "Grade : ";
            studentInfoTemplate += "<select id='studentInfoGrade'>";
            studentInfoTemplate += "<option value='" + studentSelected['id'] + "'>" + studentSelectedGrade + "</option>"
            studentInfoTemplate += "<option></option>"
            studentInfoTemplate += streamsOptions();
            studentInfoTemplate += "</select>";
            studentInfoTemplate += "<button onclick='deleteItem(2," + studentSelected['id'] + ")'>Delete</button>";
            studentInfoTemplate += "<div id='msgBoard'></div>"
            $("#info").html(studentInfoTemplate);

            //Make the gender selected
            $("#studentInfoGender").val(studentSelected['gender']).trigger('change');

            //Add listeners for change in student info
            $("#studentInfoName").change(function () {
                // console.log(1)
                //$("document").click(function(){
                save(2, studentSelected['id'], 'name', $("#studentInfoName").val());
                //console.log(1)
                //})
            })

            //change gender
            $("#studentInfoGender").change(function () {
                //$("body").click(function(){
                console.log(1)
                save(2, studentSelected['id'], 'gender', $("#studentInfoGender").val());
                //})
            })

            $("#studentInfoGrade").change(function () {
                //$("body").click(function(){
                console.log(1)
                save(2, studentSelected['id'], 'grade', $("#studentInfoGrade").val());
                //})
            })

            $("#studentInfoDOB").change(function () {
                //$("document").click(function(){
                console.log(1)
                save(2, studentSelected['id'], 'dob', $("#studentInfoDOB").val());
                //})
            })
        })

        $("#addStudentButton").click(function () { showStudentForm() });

    })

    $("#tab2").click(function () {

        makeTeachersTable(teachersArray, 'container')
    })

    $("#tab3").unbind('click').click(function () {
        $("#container").html('<button id="createAssessment">New assessment</button>\
                              <button id="showMarksForm">Results</button>\
                              <button id="showReportsForm">Reports</button>\
                              <div id="marksDesk"></div>\
                            ');

        $("#three").css('display', 'block');
        //Append the grades in the select grade input when user clicks on the marks tab
        marks();
        //$(this).off('click')
        return false;
    })

    $("#tab4").click(function () {
        misc('container');

        return false;
    })
})

//Fetch all students and place them in array
function fetchThis(what, round) {
    var url;
    if (what == 1) {
        url = "modules/fetch.php?allteachers=&school_id=" + schoolId;
    }
    if (what == 2) {
        url = "modules/fetch.php?allStudents=&school_id=" + schoolId;
    }
    if (what == 3) {
        url = "modules/fetch.php?streams=";
    }
    if (what == 4) {
        url = "modules/fetch.php?subjects=";
    }
    if (what == 5) {
        url = "modules/fetch.php?tests=" + currentPeriodId;
    }
    if (what == 6) {
        url = "modules/fetch.php?periods=";
    }
    if (what == 7) {
        url = "modules/fetch.php?school_info=&user=" + userId;
    }
    $.ajax({
        url: url,
        method: "get",
        success: function (data) {
            if (data != "") {
                if (what == 1) {
                    fetchedTeachers(data, round);
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
                    fetchedPeriods(data, round);
                }
                if (what == 7) {
                    schoolInfo(data);
                }
            }

        }
    });
    return false;
}

function fetchedPeriods(json, round) {
    periods = JSON.parse(json);

    if (round !== 2) {
        setCurrentPeriod();
        generateTermOptions('termOptions')
    }

    changeTermListener();

    return false;
}
function schoolInfo(json) {
    var info = JSON.parse(json);
    schoolId = info['id'];
    schoolName = info['name'];
    schoolType = info['type'];
    //Fecth all teachers and add them to and array and make a table using the array
    fetchThis(1);
    //fetch all student and add them to an array and add them to select option list using the student's array
    fetchThis(2);
}
function changeTermListener() {
    $('#termOptions').change(function () {
        var selectedTermValue = $('#termOptions').val()
        //get first value == year's index in periods array
        var selectedTermYear = selectedTermValue.split(',')[0];
        //get second value == period's index in the periods array
        var selectedTermArrayPosition = selectedTermValue.split(',')[1];
        //get the periods array of a the selected year using the year's index and the index of the period array
        var selectedPeriodArray = periods[selectedTermYear]['periods'][selectedTermArrayPosition]
        var selectedTermId = selectedPeriodArray['id'];
        var selectedTermName = selectedPeriodArray['name'];

        if (selectedTermId !== currentPeriodId) {
            currentPeriodId = selectedTermId;
            currentPeriod = selectedTermName;

            fetchThis(5);
            marks();
            alert("Term changed successfully")
        }

        return false;
    })
    return false;
}

function generateTermOptions(idOfElement) {
    for (var i = 0; i < periods.length; i++) {
        var position = periods[i]['periods'];
        for (var h = 0; h < position.length; h++) {
            var periodName = position[h]['name']
            infoArray = i + ',' + h;
            $('#' + idOfElement).select2({
                data: [
                    /*
                     * Text format
                     *
                     * Year position
                     * Period position
                     */
                    //{ id: position[h]['id'], text: periods[i]['year'] + " " + periodName }
                    { id: infoArray, text: periods[i]['year'] + " " + periodName }
                ]
            })
        }
    }

    $('#' + idOfElement).val(infoArray).trigger('change');
}
function setCurrentPeriod() {
    var lastYearPosition = periods.length - 1;
    var periodsArray = periods[lastYearPosition]['periods'];
    var lastPeriodPosition = periodsArray.length - 1;
    var lastPeriodArray = periodsArray[lastPeriodPosition];
    currentPeriod = lastPeriodArray['name'];
    currentPeriodId = lastPeriodArray['id'];
    //fetch tests in the current period
    fetchThis(5);

    return false;
}

function fetchedSubjects(data) {
    subjects = JSON.parse(data);
    return false;
}
//Function to fire when teachers have been fetched
function fetchedTeachers(data, round) {
    teachersArray = JSON.parse(data);
    if (round != 2) {
        //makeTeachersTable(teachersArray);
        //addTeachersTosearchBox();

    }
    addTeachersTosearchBox();

    return false;
}
//Function to fire when streams have been fetched
function fetchedStreams(data) {
    streams = JSON.parse(data);
    return false;
}
function fetchedtests(data) {
    if (data !== "") {
        testsDone = JSON.parse(data);
    }

    return false;
}
function add(what, info) {
    var url = "modules/insert.php";

    if (what == 1) {
        url += "?staff=";
    }

    if (what == 2) {
        url += "?student=";
    }

    //add subject
    if (what == 3) {
        url += "?subject="
    }

    //add stream
    if (what == 4) {
        url += "?stream="
    }
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: info,
        success: (data) => {
            insertMsg(what, data);
        }

    });
    return false;
}
function insertMsg(what, msg) {
    var object;
    if (what == 1) {
        object = "Staff";
    }
    if (what == 2) {
        object = "Student";
    }
    if (what == 3) {
        object = "Subject";
    }
    if (what == 4) {
        object = "Stream";
    }

    if (msg == "ko") {
        alert("Failed to insert " + object);
    }

    if (msg == "ok") {
        $(".modal").remove();

        alert(object + " successfully inserted");

        if (what == 1) {
            // $("#addTeacherModal").remove();
            fetchThis(1);
            //makeTeachersTable(teachersArray,'container')
            $("#container").html('');
        }
        if (what == 2) {
            // $("#addStudentModal").remove();
            fetchThis(2);
        }
        if (what == 3) {
            fetchThis(4);
        }
        if (what == 4) {
            fetchThis(3);
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
    var url = "modules/update.php";
    //school info
    if (who == 0 && what == 'schoolName') {
        url += "?school_name=" + as+"&id="+schoolId;
    }

    if (who == 0 && what == 'schoolType') {
        url += "?school_type=" + as+"&id="+schoolId;
    }
    //For staff

    if (who == 1 && what == 'name') {
        url += "?staff_name=&id=" + id + "&name=" + as;
    }

    if (who == 1 && what == 'gender') {
        url += "?staff_gender=&id=" + id + "&gender=" + as;
    }

    if (who == 1 && what == 'email') {
        url += "?staff_email=&id=" + id + "&email=" + as;
    }
    if (who == 1 && what == 'tel') {
        url += "?staff_tel=&id=" + id + "&tel=" + as;
    }

    if (who == 1 && what == 'title') {
        url += "?staff_title=&id=" + id + "&title=" + as;
    }

    //For students
    if (who == 2 && what == 'name') {
        url += "?student_name=&id=" + id + "&name=" + as;
    }

    if (who == 2 && what == 'gender') {
        url += "?student_gender=&id=" + id + "&gender=" + as;
    }

    if (who == 2 && what == 'grade') {
        url += "?student_grade=&id=" + id + "&grade=" + as;
    }
    if (who == 2 && what == 'dob') {
        url += "?student_dob=&id=" + id + "&dob=" + as;
    }
    $.ajax({
        url: url,
        method: "get",
        success: function (msg) {
            if (who == 0) {
                saveMsgResponse(0, msg)
            }

            if (who == 1) {
                saveMsgResponse(1, msg)
            }
            if (who == 2) {
                saveMsgResponse(2, msg)
            }

        }
    });
    return false;
}
function saveMsgResponse(what, msg) {
    var successMsg = "<span id='saveSuccess'><br>Data saved</span>";
    var failureMsg = "<span id='saveFail' style='display:none'><br>Failed to save data</span>";

    if (what==0 && msg == "ok") {
        $("#msgBoard").html("");
        $("#msgBoard").append(successMsg);
        $("#saveSuccess").fadeIn().delay(2000).fadeOut();
        //Update the students' array
        //fetchThis(2, 2)
        //$("#saveSuccess").remove();
    }


    if (what == 1 && msg == "ok") {
        $("#msgBoard").html("");
        $("#msgBoard").append(successMsg);
        $("#saveSuccess").fadeIn().delay(2000).fadeOut();
        //Update the staff' array
        fetchThis(1, 2)
    }

    if (what == 2 && msg == "ok") {
        $("#msgBoard").html("");
        $("#msgBoard").append(successMsg);
        $("#saveSuccess").fadeIn().delay(2000).fadeOut();
        //Update the students' array
        fetchThis(2, 2)
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
                { id: subjects[i]['id'], text: subjects[i]['name'] + " " + stream }
            ]
        });
    }
    return false;
}

//Marks
//Append all grades to form
function marks() {
    $('#createAssessment').unbind('click').click(function () {
        showNewAssessmentForm()
        return false
    })
    $('#showMarksForm').unbind('click').click(function () {
        marksForm()
        return false
    })
    $('#showReportsForm').unbind('click').click(function () {
        reportsForm()
        return false
    })
    return false
}
function appendMarks(json, testID) {
    if (isJSON(json) && json !== "") {
        var jsonArray = JSON.parse(json);
        var tabvaremplate = "<table id='marksTable'><tr><th>#</th><th>Name</th><th>Marks</th></tr>";
        var i = 0;
        var number = 0;
        for (i; i < jsonArray.length; i++) {
            number++;

            tabvaremplate += "<tr>";
            tabvaremplate += "<td>" + number + "</td>";
            tabvaremplate += "<td>" + jsonArray[i]['name'] + "</td>";
            tabvaremplate += "<td><input class='mark' id='" + jsonArray[i]['id'] + "' value=" + jsonArray[i]['marks'] + "></td>";
            tabvaremplate += "</tr>";
            //console.log(jsonArray[i]);
        }
        tabvaremplate += "</table>";
        $("#results").html("");
        $("#results").append(tabvaremplate);

        //Function 

        $('.mark').on('change', function () {
            var studentId = $(this).attr('id');
            console.log(studentId)
            var newMark = $(this).val();
            var msg = "<span id='saveMsg'>Data saved successfully</span>"
            var failMsg = "<span id='failedToSaveMsg'>Failed to save data</span>"
            $.ajax({
                url: "modules/update.php?marks=",
                method: "post",
                data: {
                    student_id: studentId,
                    mark: newMark,
                    test: testID
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
    var form = "<div class='modal'>\
    <form id='newAssessmentForm'>\
    <h4>Grade</h4>\
    <select name='grade' id='grade'>\
    <option><option>\
    </select><br>\
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
    $("#grade").html(streamsOptions())
    $("#grade").select2()

    //createMonthOptions('month');
    addListeners();
    return false;
}
function createMonthOptions(idOfElement) {
    for (var i = 0; i < months.length; i++) {
        $('#' + idOfElement).select2({
            data: [
                { id: i, text: months[i] }
            ]
        });
    }
    return false;
}
function addListeners() {
    $("#cancel").click(function () {
        event.preventDefault();

        $('.modal').remove();

        return false;
    })
    $('#create').click(function () {
        event.preventDefault();

        validateAndsubmit();

        return false;
    })
    //when user selects a grade
    $("#grade").change(function () {
        $("#subject").html('');
        var streamId = $("#grade").find("option:selected").attr('value');
        var option = "<option></option>";

        //loop through subject array to get subjects taught in the selected grade
        for (var i = 0; i < subjects.length; i++) {

            if (subjects[i]['stream'] == streamId) {
                option += "<option value='" + subjects[i]['id'] + "'>" + subjects[i]['name'] + "</option>"
            }
        }
        $("#subject").html('').append(option);
        $("#subject").select2()

    })
    $("#type").change(function () {
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
            var number = parseInt(month, 10) + 1;
            var name = "Test " + number;
            console.log(number)
            console.log(name);
            form.append('month', month);
            form.append('name', name);
        }
        else {
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
                    fetchThis(5);
                    alert("Assessment successfully created.")
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


function dashboard() {
    $("#desk").html("<!-- Student start -->\
    <div id='container'></div>");
}

function marksForm() {
    $("#marksDesk").html(' <form id="marksForm">\
            <div class="form-group row">\
                <label for="inputEmail3" class="col-sm-2 col-form-label">Grade</label>\
                <div class="col-sm-10">\
                    <select name="subject" id="marksGrade">\
                    </select>\
                </div>\
            </div>\
            <div class="form-group row">\
                <label for="inputEmail3" class="col-sm-2 col-form-label">subject</label>\
                <div class="col-sm-10">\
                    <select name="grade" id="marksSubject">\
                    </select>\
                </div>\
            </div>\
            <div class="form-group row">\
                <label for="inputEmail3" class="col-sm-2 col-form-label">Test</label>\
                <div class="col-sm-10">\
                    <select name="test" id="marksTest" required>\
                    </select>\
                </div>\
            </div>\
            <button id="viewResults">View results</button>\
        </form>\
        <div id="results"></div>\
    </div>');

    $("#marksGrade").html('<option></option>').append(streamsOptions());
    $("#marksGrade").change(function () {
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
        $("#marksTest").html('');
        $("#marksTest").html('');
        $("#marksSubject").change(function () {
            $("#marksTest").html('');
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

            $("#viewResults").click(function () {
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
                            appendMarks(data, test);
                        }
                    })
                }
                return false;
            })
            return false;
        })
        return false;
    })
}

function reportsForm() {
    $("#marksDesk").html("<form>\
    <h4>Grade</h4>\
    <select name='grade' id='grade'></select><br>\
    <h4>Type</h4>\
    <select name='type' id='type'>\
    <option></option>\
    <option value='1'>Monthly</option>\
    <option value='2'>Annual</option>\
    </select><br>\
    <button id='generate'>Generate</button>\
</form>");

    $("#grade").html("<option></option>" + streamsOptions())

    $("#type").change(function () {

        var type = $("#type").val();
        console.log(type)
        //Monthly reports
        if (type == 1) {
            $("#type").after("<select name='month' id='month'></select>")
            createMonthOptions("month")
        }
        //Annual reports
        if (type == 2) {
            $("#months").remove()
            $(".select2-container").remove()
        }

        return false;
    })

    $("#generate").click(function () {
        event.preventDefault();

        var grade = $("#grade").val()
        var type = $("#type").val()
        var month;

        //monthly
        if (type == 1) {
            month = $("#month").val()
        }

        if (grade != '' && type != '') {
            var url = "modules/report.php";

            url += "?grade=" + grade
            url += "&type=" + type;
            url += "&period=" + currentPeriodId;

            if (type == 1) {
                //add 1 coz months are stored in an array
                url += "&month=" + (parseInt(month, 10) + 1);
            }

            window.open(url)
        }
    })
}


function misc(container) {
    $('#' + container).html('');

    $('#' + container).append("<button id='schoolInfo'>Info</button>");
    $('#' + container).append("<button id='lists'>Lists</button>");
    $('#' + container).append("<button id='newGrade'>New grade</button>");
    $('#' + container).append("<button id='newSubject'>New subject</button>");
    $('#' + container).append("<div id='board'><div>");

    $("#schoolInfo").click(function () {
        info('board');
    })

    $("#lists").click(function () {
        list('board');
    })

    $("#newGrade").click(function () {
        newGradeForm();
    })

    $("#newSubject").click(function () {
        newsubjectForm();
    })
    function newsubjectForm() {
        $('body').append("<div class='modal'>\
                            <form>\
                                <h4>Subject Name</h4>\
                                <input type='text' id='subjectName'>\
                                <h4>Grade</h4>\
                                <select id='grade'></select>\
                                <h4>Type</h4>\
                                <select id='type'>\
                                    <option value='1'>Compulsary</option>\
                                    <option value='2'>Elective</option>\
                                </select>\
                                <h4>Hours per week</h4>\
                                <input type='number' name='hours' id='hours'>\
                                <br>\
                                <button id='cancel'>Cancel</button>\
                                <button id='create' type='submit'>Create</button>\
                            </form>\
                          </div>");

        $("#grade").html(streamsOptions());

        $("#cancel").click(function () {
            event.preventDefault();

            $('.modal').remove();

            return false;
        })

        $("#create").click(function () {
            event.preventDefault();

            var subjectName = $("#subjectName").val();
            var grade = $("#grade").val();
            var type = $("#type").val();
            var hoursPerWeek = $("#hours").val();
            var validName, validGrade, validType, validHours = false;
            if (subjectName == '') {
                alert("Enter a subject name");
            }
            else {
                validName = true;
            }

            if (grade == '') {
                alert("Enter a grade");
            }
            else {
                validGrade = true;
            }

            if (type == '') {
                alert("Enter a subject type");
            }
            else {
                validType = true;
            }
            if (hoursPerWeek == '' && !isNaN(hoursPerWeek)) {
                alert("Enter the number of hours per week");
            }
            else {
                validHours = true;
            }
            if (validName == true && validGrade == true && validType == true && validHours == true) {
                //console.log("ok")
                var form = new FormData();

                form.append('name', subjectName);
                form.append('grade', grade)
                form.append('type', type)
                form.append('hours', hoursPerWeek);

                add(3, form);
            }
        })
    }

    function newGradeForm() {
        $('body').append("<div class='modal'>\
                            <form>\
                                <h4>Grade</h4>\
                                <input type='number' name='grade' id='grade' placeholder='A number'>\
                                <h4>Stream</h4>\
                                <input type='text' name='stream' id='stream' maxlength='1' placeholder='A - Z'>\
                                <br>\
                                <button id='cancel'>Cancel</button>\
                                <button id='create' type='submit'>Create</button>\
                            </form>\
                            </div>");

        $("#cancel").click(function () {
            event.preventDefault();

            $('.modal').remove();

            return false;
        })

        $("#create").click(function () {
            event.preventDefault();

            var grade = $("#grade").val();
            var stream = $("#stream").val();

            var validGrade, validStream = false;

            if (grade !== '' && !isNaN(grade)) {
                validGrade = true;
            }
            else {
                alert("Enter a grade");
            }
            if (stream !== '' && stream.length == 1 && isNaN(stream)) {
                validStream = true;
            }
            else {
                alert("Enter a valid stream");
            }

            if (validGrade, validStream == true) {
                //console.log("ok")

                var form = new FormData();
                form.append('grade', grade);
                form.append('stream', stream.toUpperCase());

                add(4, form);
            }
        })
    }
    function info(id) {
        $("#" + id).html('')

        $("#" + id).append("<span>Name : </span>" + '<input id="schoolName" value="' + schoolName + '"><br>');
        //$("#four").append("<span>Type : </span>"+"<input value="+schoolTypes[schoolType]+">");
        //$("#four").append("<h5></h5>");
        var typeOptions;

        for (var i = 0; i < schoolTypes.length; i++) {
            typeOptions += "<option value=" + i + ">" + schoolTypes[i] + "</option>";
        }

        $("#" + id).append("<span>Type : </span>")
        $("#" + id).append("<select id='schoolType'>" + typeOptions + "</select>");
        $("#" + id).append("<div id='msgBoard'></div>")
        $("#schoolType").val(schoolType).trigger('change');

        $("#schoolName").change(function () {
            var name = $("#schoolName").val();
            save(0, schoolId, 'schoolName', name)
        })

        $("#schoolType").change(function () {
            var type = $("#schoolType").val();
            save(0, schoolId, 'schoolType', type)
        })
    }

    function list(id) {
        $("#" + id).html("<h4>Grade</h4>\
                          <select name='grade' id='grade'></select>\
                          <br>\
                          <button id='generate'>Generate</button>");

        $("#grade").html("<option></option>" + streamsOptions());

        $("#generate").click(function () {
            event.preventDefault();

            var grade = $("#grade").val();

            if (grade !== '') {
                var url = "modules/list.php?grade=" + grade;
                window.open(url)
            }
        })
    }
}

