//Fetch info about teacher and assign it to the Teacher object
fetch(2);
//Teacher object to contain all info about teacher, streams taught and tests done
var Teacher = new Object;
/*
 * 1 : grades taught
 * 2 : subjects taught
 * 3 : test
 */
var currentYearId, currentYear, currentPeriodId, currentPeriod;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function fetch(what) {
    var url = "modules/fetch.php";
    if (what == 1) {
        url += "?form_options="
    }
    if (what == 2) {
        url += "?periods="
    }
    /*if (what == 3) {
        url += "?tests="
    }*/
    $.ajax({
        url: url,
        method: 'get',
        data:{
            teachers_period:1
        },
        success: function (data) {
            if (data !== "") {
                if (what == 1) {
                    assignProp(data);

                }
                if (what == 2) {
                    fetchedPeriods(data);
                }
                /*if (what == 3) {
                    tests = JSON.parse(data);
                }*/
            }


        }
    })
}
function fetchedPeriods(json) {
    periods = JSON.parse(json);
    setCurrentPeriod();
    appendToSelectTerm();
    generateTermOptions('termOptions')
     //Fetch tests in current period
     fetch(1);
    return false;
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
function assignProp(json) {
    if (json != "") {
        var jsonArray = JSON.parse(json);
        var i;
        var subjectIds = [];
        var subjectNames = [];
        var streamIds = [];
        var streamNames = [];
        var testsIds = [];
        var testNames = [];
        for (i = 0; i < jsonArray.length; i++) {
            subjectIds.push(jsonArray[i]['id']);
            subjectNames.push(jsonArray[i]['name']);
            streamIds.push(jsonArray[i]['stream_id']);
            streamNames.push(jsonArray[i]['stream_name']['grade'] + ' ' + jsonArray[i]['stream_name']['stream']);
            testsIds.push(jsonArray[i]['test_id']);
            testNames.push(jsonArray[i]['test_name']);
        }
        Teacher.subjectTaughtIds = subjectIds;
        Teacher.subjectTaughtNames = subjectNames;
        Teacher.streamsTaughtIds = streamIds;
        Teacher.streamsTaughtNames = streamNames;
        Teacher.testsDoneId = testsIds;
        Teacher.testsDoneName = testNames;
        //After fetching append info to form
        appendSubjectsToForm();
        //console.log('1');

    }
}

function appendSubjectsToForm() {
    var options = "";
    for (var i = 0; i < Teacher.subjectTaughtNames.length; i++) {
        var name = Teacher.subjectTaughtNames[i]
        var id = Teacher.subjectTaughtIds[i];
        options += "<option value=" + id + " position=" + i + ">" + name + "</option>";
    }
    $('#subject').append(options);
    //alert(options);
}
$('document').ready(function () {
    $("#subject").change(function () {
        var position = $(this).find('option:selected').attr('position');
        //console.log(position);
        if (position !== undefined) {
            var gradeId = Teacher.streamsTaughtIds[position];
            var grade = Teacher.streamsTaughtNames[position];
            $("#grade").html("");
            $("#grade").append("<option value=" + gradeId + "> Grade " + grade + "</option>");
            var testId = Teacher.testsDoneId[position];
            var test = Teacher.testsDoneName[position];
            $("#test").html("");
            $("#test").append("<option value=" + testId + ">" + test + "</option>");
        }
        else {
            $("#grade").html("");
            $("#test").html("");
        }


    })
    $("#view").click(function () {
        event.preventDefault();
        //Prevent form from being submitted if no options for test or its value is null(In case a subject does not have a test)
        if ($("#test").has('option').length > 0 && $("#test").find('option:selected').attr('value') !== "") {
            var subject = $("#subject").find('option:selected').attr('value');
            var grade = $("#grade").find('option:selected').attr('value');
            var test = $("#test").find('option:selected').attr('value');
            /*var formData = new FormData();
            formData.append('subject', subject);
            formData.append('grade', grade);
            formData.append('test', test);
            //formData.append('',);*/
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
        }


    })
});

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