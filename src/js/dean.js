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
//var currentYearPosition, currentYearId, currentYear, currentPeriodPosition, currentPeriodId, currentPeriod;
var currentPeriodId, currentPeriod;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
$(document).ready(function () {
    //fetcth periods;
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

    })

    $("#tab3").unbind('click').click(function () {
        $("#one").hide();
        $("#two").hide();
        $("#three").css('display', 'block');
        //Append the grades in the select grade input when user clicks on the marks tab
        marks();
        //$(this).off('click')
        return false;
    })
    $("#searchStudent").on("change", function () {
        //console.log($(this)/*.find("selected:option").attr("value")*/)
        let position = $("#searchStudent").select2('val');
        console.log(position)
        let studentSelected = studentsArray[position];
        let studentInfoTemplate = "";
        let studentSelectedImage = studentSelected['image'];
        if (studentSelectedImage == "") {
            studentSelectedImage = "src/img/user.png";
        }
        let studentSelectedName = studentSelected['name'];
        let studentSelectedDOB = studentSelected['DOB'];
        let studentSelectedEmail = studentSelected['email'];
        let studentSelectedGrade = studentSelected['stream']['grade'] + ' ' + studentSelected['stream']['stream'];
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
})

//Fetch all students and place them in array
function fetch(what, round) {
    let url;
    if (what == 1) {
        url = "modules/fetch.php?allteachers=";
    }
    if (what == 2) {
        url = "modules/fetch.php?allStudents=";
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
    $.ajax({
        url: url,
        method: "get",
        success: function (data) {
            if (data != "") {
                if (what == 1) {
                    fetchedTeachers(data, round);
                }
                if (what == 2) {
                    fetchedStudents(data, round);
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

function changeTermListener() {
    $('#termOptions').change(() => {
        let selectedTermValue = $('#termOptions').val()
        //get first value == year's index in periods array
        let selectedTermYear = selectedTermValue.split(',')[0];
        //get second value == period's index in the periods array
        let selectedTermArrayPosition = selectedTermValue.split(',')[1];
        //get the periods array of a the selected year using the year's index and the index of the period array
        let selectedPeriodArray = periods[selectedTermYear]['periods'][selectedTermArrayPosition]
        let selectedTermId = selectedPeriodArray['id'];
        let selectedTermName = selectedPeriodArray['name'];

        if (selectedTermId !== currentPeriodId) {
            currentPeriodId = selectedTermId;
            currentPeriod = selectedTermName;

            fetch(5);
            marks();
            alert("Term changed successfully")
        }

        return false;
    })
    return false;
}

function generateTermOptions(idOfElement) {
    for (let i = 0; i < periods.length; i++) {
        let position = periods[i]['periods'];
        for (let h = 0; h < position.length; h++) {
            let periodName = position[h]['name']
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
    let lastYearPosition = periods.length - 1;
    let periodsArray = periods[lastYearPosition]['periods'];
    let lastPeriodPosition = periodsArray.length - 1;
    let lastPeriodArray = periodsArray[lastPeriodPosition];
    currentPeriod = lastPeriodArray['name'];
    currentPeriodId = lastPeriodArray['id'];
    //fetch tests in the current period
    fetch(5);

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
        makeTeachersTable(teachersArray);
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
function add(who, info) {
    let url;

    if (who == 1) {
        url = "modules/insert.php?staff=";
    }

    if (who == 2) {
        url = "modules/insert.php?student=";
    }

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
    let person;
    if (who == 1) {
        person = "Staff";
    }
    if (who == 2) {
        person = "Student";
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
    for (let i = 0; i < streams.length; i++) {
        optionsTemplate += "<option value='" + streams[i]['id'] + "'>Grade " + streams[i]['grade'] + ' ' + streams[i]['stream'] + "</option>";
    }
    return optionsTemplate;
}
function save(who, id, what, as) {
    //For staff
    let url;
    if (who == 1 && what == 'name') {
        url = "modules/update.php?staff_name=&id=" + id + "&name=" + as;
    }
    if (who == 1 && what == 'email') {
        url = "modules/update.php?staff_email=&id=" + id + "&email=" + as;
    }
    if (who == 1 && what == 'tel') {
        url = "modules/update.php?staff_tel=&id=" + id + "&tel=" + as;
    }

    //For students
    if (who == 2 && what == 'name') {
        url = "modules/update.php?student_name=&id=" + id + "&name=" + as;
    }
    if (who == 2 && what == 'grade') {
        url = "modules/update.php?student_grade=&id=" + id + "&grade=" + as;
    }
    if (who == 2 && what == 'dob') {
        url = "modules/update.php?student_dob=&id=" + id + "&dob=" + as;
    }
    $.ajax({
        url: url,
        method: "get",
        success: function (msg) {
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
function saveMsgResponse(who, msg) {
    let successMsg = "<span id='saveSuccess'><br>Data saved</span>";
    let failureMsg = "<span id='saveFail' style='display:none'><br>Failed to save data</span>";

    if (who == 1 && msg == "ok") {
        $("#msgBoard").html("");
        $("#msgBoard").append(successMsg);
        $("#saveSuccess").fadeIn().delay(2000).fadeOut();
        //Update the staff' array
        fetch(1, 2)
    }

    if (who == 2 && msg == "ok") {
        $("#msgBoard").html("");
        $("#msgBoard").append(successMsg);
        $("#saveSuccess").fadeIn().delay(2000).fadeOut();
        //Update the students' array
        fetch(2, 2)
        //$("#saveSuccess").remove();
    }

    return false;
}

function subjects_gradeOptions(idOfElement) {
    //var array = "";
    for (let i = 0; i < subjects.length; i++) {
        //var position=subjects[i]['stream'];
        let stream = "";//streams[i][position];
        for (let h = 0; h < streams.length; h++) {
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
        let streamId = $("#marksGrade").find("option:selected").attr('value');
        //console.log(streamId)
        let option = "<option></option>";
        for (let i = 0; i < subjects.length; i++) {

            if (subjects[i]['stream'] == streamId) {
                option += "<option value='" + subjects[i]['id'] + "'>" + subjects[i]['name'] + "</option>"
            }
        }
        $("#marksSubject").html('').append(option);
        $("#marksTest").html('');
        $("#marksTest").html('');
        $("#marksSubject").change(() => {
            $("#marksTest").html('');
            //If change subject clear the tests field
            $("#marksTest").html('');
            let subjectId = $("#marksSubject").find('option:selected').attr('value');
            let option = "<option></option>";
            for (let i = 0; i < testsDone.length; i++) {

                if (testsDone[i]['subject'] == subjectId) {
                    option += "<option value='" + testsDone[i]['id'] + "'>" + testsDone[i]['name'] + "</option>"
                }
            }
            $("#marksTest").html('').append(option);

            $("#viewResults").click(() => {
                event.preventDefault();
                let subject = $("#marksSubject").find('option:selected').attr('value');
                let grade = $("#marksGrade").find('option:selected').attr('value');
                let test = $("#marksTest").find('option:selected').attr('value');

                if (subject !== "" && grade !== "" && test !== "" && test !== undefined) {
                    //if ($("#marksTest").has('option').length > 0 && $("#marksTest").find('option:selected').attr('value') !== "") {
                    let formData = {
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
        let jsonArray = JSON.parse(json);
        let tableTemplate = "<table><tr><th>#</th><th>Name</th><th>Marks</th></tr>";
        let i = 0;
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

        $('.mark').on('change', function () {
            let studentId = $(this).attr('id');
            let newMark = $(this).val();
            let msg = "<span id='saveMsg'>Data saved successfully</span>"
            let failMsg = "<span id='failedToSaveMsg'>Failed to save data</span>"
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
    let form = "<div class='modal'>\
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
    for (let i = 0; i < months.length; i++) {
        $('#' + idOfElement).select2({
            data: [
                { id: i, text: months[i] }
            ]
        });
    }
    return false;
}
function addListeners() {
    $("#cancel").click(() => {
        event.preventDefault();

        $('.modal').remove();

        return false;
    })
    $('#create').click(() => {
        event.preventDefault();

        validateAndsubmit();

        return false;
    })
    //when user selects a grade
    $("#grade").change(() => {
        $("#subject").html('');
        let streamId = $("#grade").find("option:selected").attr('value');
        let option = "<option></option>";

        //loop through subject array to get subjects taught in the selected grade
        for (let i = 0; i < subjects.length; i++) {

            if (subjects[i]['stream'] == streamId) {
                option += "<option value='" + subjects[i]['id'] + "'>" + subjects[i]['name'] + "</option>"
            }
        }
        $("#subject").html('').append(option);
        $("#subject").select2()

    })
    $("#type").change(() => {
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
    let subject = $('#subject').val();
    let type = $('#type').val();
    let month;

    let validSubject, validType, validMonth
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
        let form = new FormData();
        form.append('subject', subject);
        form.append('type', type);
        form.append('period', currentPeriodId);

        if (type == 1) {
            let number = parseInt(month, 10) + 1;
            let name = "Test " + number;
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
                    fetch(5);
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
    let regex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return regex.test(email);
}