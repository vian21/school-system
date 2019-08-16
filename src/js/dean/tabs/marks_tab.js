//Marks
//Append all grades to form
function marks() {
    $("#container").html('<button id="createAssessment">New assessment</button>\
                            <button id="showMarksForm">Results</button>\
                            <button id="showReportsForm">Reports</button>\
                            <div id="marksDesk"></div>');

    $('#createAssessment').click(function () {
        showNewAssessmentForm();

        return false
    })

    $('#showMarksForm').click(function () {
        marksForm();

        return false
    })

    $('#showReportsForm').click(function () {
        reportsForm();

        return false
    })

    return false
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
            createAssessment();

        }
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