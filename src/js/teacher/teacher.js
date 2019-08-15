//Fetch info about teacher and assign it to the Teacher object
fetchThis(2);
//Teacher object to contain all info about teacher, streams taught and tests done
var Teacher = new Object;
var currentYearId, currentYear, currentPeriodId, currentPeriod;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function fetchThis(what) {
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
        data: {
            teachers_period: currentPeriodId
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
$("#createAssessment").click(function () {
    showNewAssessmentForm();
})
function fetchedPeriods(json) {
    periods = JSON.parse(json);

    setCurrentPeriod();

    generateTermOptions('termOptions')
    //Fetch tests in current period
    fetchThis(1);

    changeTermListener();

    return false;
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

            fetchThis(1);
            alert("Term changed successfully")
        }

        return false;
    })
    return false;
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
        //appendSubjectsToForm('subject');
        $("#subject").html(subjects())
        //console.log('1');

    }
}

function subjects() {
    //console.log('ok')
    var options = "<option><option>";
    for (var i = 0; i < Teacher.subjectTaughtNames.length; i++) {
        var name = Teacher.subjectTaughtNames[i]
        var id = Teacher.subjectTaughtIds[i];
        options += "<option value=" + id + " position=" + i + ">" + name + "</option>";
    }
    console.log(options)
    return options;
    //alert(options);
}

$("#subject").change(function () {
    var position = $(this).find('option:selected').attr('position');
    //console.log(position);
    if (position !== undefined) {
        var gradeId = Teacher.streamsTaughtIds[position];
        var grade = Teacher.streamsTaughtNames[position];
        $("#grade").html("");
        $("#grade").append("<option value=" + gradeId + "> Grade " + grade + "</option>");
        var testId = Teacher.testsDoneId[position]; //array of test ids
        var test = Teacher.testsDoneName[position]; //array of test names
        $("#test").html("");

        for(var i=0;i<testId.length;i++){
            $("#test").append("<option value=" + testId[i] + ">" + test[i] + "</option>");
        }
        
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
                appendMarks(data,test);
            }
        })
    }


})


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

function showNewAssessmentForm() {
    var form = "<div class='modal'>\
                    <form id='newAssessmentForm'>\
                        <h4>Subject</h4>\
                        <select name='grade' id='assessedSubject'>\
                        </select><br>\
                        <h4>Type</h4>\
                        <select name='type' id='type'><br>\
                            <option value=''></option>\
                            <option value='1'>Test</option>\
                            <option value='2'>Exam</option>\
                        </select><br>\
                        <button id='cancel'>Cancel</button>\
                        <button id='create'>Create</button>\
                    </form>\
                    </div>";

    $('body').append(form);
    $("#assessedSubject").html(subjects())
    //$("#assessedSubject").select2()

    //createMonthOptions('month');
    addListeners();
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

        validateNewAssessmentForm();

        return false;
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

function validateNewAssessmentForm() {
    var subject = $('#assessedSubject').val();
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
    if (type == 1) {
        if (month == "") {
            alert("Enter a month")
        }
        else {
            validType = true;
            validMonth = true;
        }
    }
    if (type == 2) {
        validType = true;
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
                    fetchThis(1);
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

function streamsOptions() {
    var optionsTemplate = "";
    for (var i = 0; i < Teacher.subjectTaughtNames.length; i++) {
        optionsTemplate += "<option value='" + Teacher.subjectTaughtNames[i]['id'] + "'>Grade " + Teacher.subjectTaughtNames[i]['grade'] + ' ' + Teacher.subjectTaughtNames[i]['stream'] + "</option>";
    }
    return optionsTemplate;
}
