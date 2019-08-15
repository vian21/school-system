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

function appendMarks(json, testID) {
    if (isJSON(json) && json !== "") {
        var jsonArray = JSON.parse(json);
        var tabletemplate = "<table id='marksTable'><tr><th>#</th><th>Name</th><th>Marks</th></tr>";
        var i = 0;
        var number = 0;
        for (i; i < jsonArray.length; i++) {
            number++;

            tabletemplate += "<tr>";
            tabletemplate += "<td>" + number + "</td>";
            tabletemplate += "<td>" + jsonArray[i]['name'] + "</td>";
            tabletemplate += "<td><input class='mark' id='" + jsonArray[i]['id'] + "' value=" + jsonArray[i]['marks'] + "></td>";
            tabletemplate += "</tr>";
            //console.log(jsonArray[i]);
        }
        tabletemplate += "</table>";
        tabletemplate += "<button onclick='deleteAssessment(" + testID + ")'>Delete</button>"
        $("#results").html("");
        $("#results").append(tabletemplate);

        //Function 

        $('.mark').on('change', function () {
            var msg = "<span id='saveMsg'>Data saved successfully</span>";
            var failMsg = "<span id='failedToSaveMsg'>Failed to save data</span>";

            var studentId = $(this).attr('id');
            console.log(studentId)
            var newMark = $(this).val();
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

function deleteAssessment(testId) {
    var msg = "<span id='saveMsg'>Data saved successfully</span>";
    var deleteFailMsg = "<span id='failedToDeleteMsg'>Failed to delete data</span>";
    $.ajax({
        url: "modules/delete.php",
        data: {
            assessment: '',
            id: testId
        },
        method: 'post',
        success: function (data) {
            if (data == "ok") {
                console.log(msg)
                $("#results").html("");
                $("#results").append(deletedMsg);
                $("#deletedMsg").fadeIn().delay(2000).fadeOut();
            }
            if (data == "ko" || data == "") {
                $("#results").html("");
                $("#results").append(deleteFailMsg);
                $("#failedToDeleteMsg").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function studentsTab() {
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
        studentInfoTemplate += "<button onclick='deleteStudent(" + studentSelected['id'] + ")'>Delete</button>";
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
}

function dashboard() {
    $("#desk").html("<!-- Student start -->\
    <div id='container'></div>");
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
    $('#' + container).append("<button id='grades'>Grades</button>");
    $('#' + container).append("<button id='newGrade'>New grade</button>");
    $('#' + container).append("<button id='subjects'>subjects</button>");
    $('#' + container).append("<button id='newSubject'>New subject</button>");
    $('#' + container).append("<div id='board'><div>");

    $("#schoolInfo").click(function () {
        info('board');
    })

    $("#lists").click(function () {
        list('board');
    })

    $("#grades").click(function () {
        grades();
    })

    $("#newGrade").click(function () {
        newGradeForm();
    })

    $("#subjects").click(function () {
        subjectsTable();
    })

    $("#newSubject").click(function () {
        newsubjectForm();
    })
    function subjectsTable() {

        var table = "<table>\
        <tr>\
            <th>#</th>\
            <th>Name</th>\
            <th>Stream</th>\
            <th></th>\
            <th></th>\
        </tr>";

        var counter = 0;

        for (var i = 0; i < subjects.length; i++) {
            counter++;

            table += "<tr>";
            table += "<td>" + counter + "</td>";
            table += "<td>" + subjects[i]['name'] + "</td>";

            table += "<td> Grade " + subjects[i]['grade'] + ' ' + subjects[i]['stream'] + "</td>";

            //subject type
            table += "<td>" + subjectTypes[subjects[i]['type']] + "</td>";

            table += "<td><button class='editGrade' id=" + i + ">Edit</button></td>";
            table += "<td><button class='deleteSubject' id=" + subjects[i]['id'] + ">Delete</button></td>";
            table += "</tr>";
        }


        table += "</table>";

        $("#board").html(table);

        $(".editGrade").click(function () {
            console.log(i)
            editSubject($(this).attr('id'));
        })

        $(".deleteSubject").click(function () {
            console.log($(this).attr('id'))
            deleteSubject($(this).attr('id'));
        })

        function deleteSubject(id) {
            $.ajax({
                url: "modules/delete.php",
                method: "post",
                data: {
                    subject: '',
                    id: id
                },
                success: function (data) {
                    if (data == 'ok') {
                        fetchThis(4);
                        alert("Subject successfully deleted");
                        misc('container');
                    }
                    else {
                        alert("Failed to delete subject");
                    }
                }
            })
        }

        function editSubject(position) {
            var form = "<div class='modal'><form>"
            form += "<h4>Grade</h4>";
            form += "<input type='number' name='grade' id='grade' class='" + streams[position]['id'] + "' value=" + streams[position]['grade'] + ">"
            form += "<h4>Stream</h4>";
            form += "<input type='text' name='stream' id='stream' maxlength='1' value=" + streams[position]['stream'] + "><br>"
            form += "<button id='cancel'>Cancel</button>"
            form += "<button id='save' type='submit'>Save</button>"
            form += "</form></div>";

            $('body').append(form);

            $("#cancel").click(function () {
                event.preventDefault();

                $('.modal').remove();

                return false;
            })

            $("#save").click(function () {
                event.preventDefault();

                var streamId = $("#grade").attr('class');
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

                if (validGrade == true && validStream == true) {
                    //console.log("ok")

                    var form = new FormData();

                    form.append('id', streamId);
                    form.append('grade', grade);
                    form.append('stream', stream.toUpperCase());

                    //add(4, form);

                    $.ajax({
                        url: "modules/update.php",
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        method: "post",
                        data: form,
                        success: (data) => {
                            $('.modal').remove();

                            if (data == 'ok') {
                                fetchThis(3)

                                alert("Grade successfully created");

                                misc('container');
                            }
                            else {
                                alert("Failed to create grade");
                            }
                        }

                    });
                }
            })
        }
    }
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

                //add(3, form);
                createSubject(form);
            }
        })
    }
    function grades() {
        var table = "<table>\
                        <tr>\
                            <th>#</th>\
                            <th>Grade</th>\
                            <th>Students</th>\
                            <th></th>\
                            <th></th>\
                        </tr>";
        var counter = 0;

        for (var i = 0; i < streams.length; i++) {
            counter++;

            table += "<tr>";
            table += "<td>" + counter + "</td>";
            table += "<td> Grade " + streams[i]['grade'] + ' ' + streams[i]['stream'] + "</td>";

            var numberOfStudentsInGrade = streams[i]['students'];

            if (numberOfStudentsInGrade == '') {
                numberOfStudentsInGrade = 0;
            }

            table += "<td>" + numberOfStudentsInGrade + "</td>";

            table += "<td><button class='editGrade' id=" + i + ">Edit</button></td>";
            table += "<td><button class='deleteGrade' id=" + streams[i]['id'] + ">Delete</button></td>";
            table += "</tr>";
        }


        table += "</table>";

        $("#board").html(table);

        $(".editGrade").click(function () {
            console.log(i)
            editGrade($(this).attr('id'));
        })

        $(".deleteGrade").click(function () {
            console.log($(this).attr('id'))
            deleteGrade($(this).attr('id'));
        })

        function deleteGrade(id) {
            $.ajax({
                url: "modules/delete.php",
                method: "post",
                data: {
                    grade: '',
                    id: id
                },
                success: function (data) {
                    if (data == 'ok') {
                        fetchThis(3);

                        alert("Grade successfully deleted");

                        misc('container');
                    }
                    else {
                        alert("Failed to delete grade");
                    }
                }
            })
        }

        function editGrade(position) {
            var form = "<div class='modal'><form>"
            form += "<h4>Grade</h4>";
            form += "<input type='number' name='grade' id='grade' class='" + streams[position]['id'] + "' value=" + streams[position]['grade'] + ">"
            form += "<h4>Stream</h4>";
            form += "<input type='text' name='stream' id='stream' maxlength='1' value=" + streams[position]['stream'] + "><br>"
            form += "<button id='cancel'>Cancel</button>"
            form += "<button id='save' type='submit'>Save</button>"
            form += "</form></div>";

            $('body').append(form);

            $("#cancel").click(function () {
                event.preventDefault();

                $('.modal').remove();

                return false;
            })

            $("#save").click(function () {
                event.preventDefault();

                var streamId = $("#grade").attr('class');
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

                if (validGrade == true && validStream == true) {
                    //console.log("ok")

                    var form = new FormData();

                    form.append('id', streamId);
                    form.append('grade', grade);
                    form.append('stream', stream.toUpperCase());

                    //add(4, form);

                    $.ajax({
                        url: "modules/update.php",
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        method: "post",
                        data: form,
                        success: (data) => {
                            $('.modal').remove();

                            if (data == 'ok') {
                                fetchThis(3)

                                alert("Grade successfully created");

                                misc('container');
                            }
                            else {
                                alert("Failed to create grade");
                            }
                        }

                    });
                }
            })
        }
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

            if (validGrade == true && validStream == true) {
                //console.log("ok")

                var form = new FormData();
                form.append('grade', grade);
                form.append('stream', stream.toUpperCase());

                //add(4, form);
                createGrade(form)
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

function saveMsgResponse(what, msg) {
    var successMsg = "<span id='saveSuccess'><br>Data saved</span>";
    var failureMsg = "<span id='saveFail' style='display:none'><br>Failed to save data</span>";

    if (what == 0 && msg == "ok") {
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


function deleteStaff(id) {
    $.ajax({
        url: "modules/delete.php?staff=" + id,
        success: function (data) {
            if (data == 'ok') {
                fetchThis(1)
                alert("Staff successfully deleted");
                $("#container").html('')
            }
            else {
                alert("Failed to delete staff");
            }
        }
    })
}

function deleteStudent(id) {
    $.ajax({
        url: "modules/delete.php?student=" + id,
        success: function (data) {
            if (data == 'ok') {
                fetchThis(2)
                dashboard();
                alert("Student successfully deleted");
                $("#container").html('')
            }
            else {
                alert("Failed to delete student");
            }
        }
    })
}

//add students to search form
function addToForm() {
    $("#searchStudent").html('')
    $("#searchStudent").append("<option></option>");
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

function showStudentForm() {
    var form = "<div id='addStudentModal' class='modal'>\
                    <form enctype='multipart/form-data'>\
                        <h4>Name :</h4><input type='text' name='name' id='studentName' required>\
                        <h4>Student's email :</h4><input type='email' name='email' id='studentEmail'>\
                        <h4>student's telephone number :</h4><input type='number' name='tel' id='studentTel'>\
                        <h4>Grade :</h4><select name='grade' id='studentGrade' required>\
                            <option value=''></option>\
                        </select>\
                        <h4>Date of birth:</h4><input type='date' name='DOB' id='studentDOB' required>\
                        <br>\
                        <h4>Gender :</h4><select name='gender' id='gender' required>\
                            <option value='0'>Male</option>\
                            <option value='1'>Female</option>\
                        </select>\
                        <br>\
                        <button type='button' id='cancelStudentForm'>Cancel</button>\
                        <button type='submit' id='addStudent'>Add</button>\
                    </form>\
                </div>";
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
        var gender = $("#gender").val();
        var validName, validGrade, validDOB;
        var period = currentPeriodId;

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
            info.append('gender', gender);
            info.append('grade', grade);
            info.append('DOB', DOB);
            info.append('period', period);

            //add(2, info);
            createStudent(info);
        }
    })
    return false;
}
function makeTeachersTable(array, container) {
    var teacherTableTemplate = "<button id='addTeacherButton'>Add</button>";
    teacherTableTemplate += "<select id='searchTeacherBox'></select>"
    teacherTableTemplate += "<button id='downloadStaffList'>Download</button>";
    teacherTableTemplate += "<div id='teacherView'>"
    teacherTableTemplate += "<table id='teachersTable'>\
                                <tr><th>#</th><th>Name</th>\
                                <th>Email</th>\
                                <th>Gender</th>\
                                <th>Number</th>\
                                <th>Title</th>\
                                <th></th>\
                                <th></th>\
                                </tr>";
    var number = 0;
    var jobTitle;
    for (let i = 0; i < array.length; i++) {
        teacherTableTemplate += "<tr>";
        number = i + 1;
        teacherTableTemplate += "<td>" + number + "</td>";
        teacherTableTemplate += "<td>" + array[i]['name'] + "</td>";
        teacherTableTemplate += "<td>" + array[i]['email'] + "</td>";
        teacherTableTemplate += "<td>" + genders[array[i]['gender']] + "</td>";
        teacherTableTemplate += "<td>" + array[i]['tel'] + "</td>";
        if (array[i]['type'] == 1) {
            jobTitle = "Dean";
        }
        if (array[i]['type'] == 2) {
            jobTitle = "Teacher";
        }
        teacherTableTemplate += "<td>" + staffTypes[array[i]['type']] + "</td>";

        //Staff edit button
        teacherTableTemplate += "<td><button onclick=getTeacherInfo(" + i + ")>Edit</button></td>"

        //staff delete button
        teacherTableTemplate += "<td><button onclick=deleteStaff(" + array[i]['id'] + ")>Delete</button></td>"

        teacherTableTemplate += "</tr>";
    }
    teacherTableTemplate += "</table></div>"
    $('#' + container).html("");
    $('#' + container).append(teacherTableTemplate);
    addTeachersTosearchBox();

    //add a listener for click on add button
    $("#addTeacherButton").click(() => { showStaffForm() });

    //let position=$("#searchTeacherBox").select2('val');

    $("#searchTeacherBox").change(() => {
        var position = $("#searchTeacherBox").select2('val');
        //console.log(position)
        getTeacherInfo(position)
    })

    //Open new tab with a pdf of staff list
    $("#downloadStaffList").click(function () {
        window.open("modules/list.php?staff=" + schoolId);

        return false;
    })


    return false;
}

function addTeacherChangeListeners(id) {
    $('#teacherName').change(() => {
        var newName = $('#teacherName').val();
        //console.log(newName)
        save(1, id, 'name', newName);

    });

    $('#staffGender').change(() => {
        var newGender = $('#staffGender').val();
        //console.log(newName)
        save(1, id, 'gender', newGender);

    });

    $('#teacherEmail').change(() => {
        var newEmail = $('#teacherEmail').val();
        save(1, id, 'email', newEmail);
        //console.log(newEmail)
    });

    $('#teacherTel').change(() => {
        var newTel = $('#teacherTel').val();
        save(1, id, 'tel', newTel);
        //console.log(newTel)
    });

    $('#staffTitle').change(() => {
        var newTitle = $('#staffTitle').val();
        //console.log(newName)
        save(1, id, 'title', newTitle);

    });
}

function addTeachersTosearchBox() {
    //console.log(1)
    $("#searchTeacherBox").html('')
    $("#searchTeacherBox").append("<option></option>");
    //$("#searchTeacherBox").html('')

    for (var i = 0; i < teachersArray.length; i++) {
        //console.log(i)
        $("#searchTeacherBox").select2({
            data: [
                { id: i, text: teachersArray[i]['name'] }
            ]
        });
    }

    $("#searchTeacherBox").select2({
        width: 'resolve'
    });
    return false;
}

function getTeacherInfo(position) {
    //console.log(position)

    //The position at which the teacher is located
    // var position = $("#searchTeacherBox").select2('val');
    var teacherId = teachersArray[position]['id'];

    teacherInfoTemplate = "<br><img src='src/img/";
    var img;
    if (teachersArray[position]['image'] == "") {
        img = "user.png";
    }
    else {
        img = teachersArray[position]['image'];
    }
    teacherInfoTemplate += img + "'><br>";
    teacherInfoTemplate += '<span>Name : </span><input id="teacherName" value="' + teachersArray[position]['name'] + '"><br>';

    teacherInfoTemplate += "Gender: <select id='staffGender'>";
    teacherInfoTemplate += "<option value='0'>Male</option>";
    teacherInfoTemplate += "<option value='1'>Female</option>";
    teacherInfoTemplate += "</select><br>";

    teacherInfoTemplate += "<span>Email : </span><input id='teacherEmail' value=" + teachersArray[position]['email'] + "><br>";
    teacherInfoTemplate += "<span>Tel : </span><input id='teacherTel' value=" + teachersArray[position]['tel'] + "><br>";

    teacherInfoTemplate += "Job : <select id='staffTitle'>";
    teacherInfoTemplate += staffTitlesOptions();
    teacherInfoTemplate += "</select><br>";

    //staff delete button
    teacherInfoTemplate += "<td><button onclick=deleteStaff(" + teachersArray[position]['id'] + ")>Delete</button></td>"
    teacherInfoTemplate += "<div id='msgBoard'></div>"

    $("#teacherView").html(teacherInfoTemplate)

    //Make the gender selected
    $("#staffGender").val(teachersArray[position]['gender']).trigger('change');

    //Make title selected
    $("#staffTitle").val(teachersArray[position]['type']).trigger('change');

    addTeacherChangeListeners(teacherId);
    //return false;
}

function showStaffForm() {
    var form = "<div id='addTeacherModal' class='modal'>\
                    <form id='addStaffForm'>\
                        <h4>Name</h4><input type='text' name='name' id='staffName' required>\
                        <br>\
                        <h4>Gender :</h4><select name='gender' id='gender' required>\
                            <option value='0'>Male</option>\
                            <option value='1'>Female</option>\
                        </select>\
                        <br>\
                        <h4>Email</h4><input type='email' name='email' id='staffEmail'>\
                         <h4>Telephone</h4>\
                         <input type='number' name='tel' id='staffTel'>\
                        <h4>Type</h4>\
                        <select id='staffType'>\
                        <option value='0'>Dean</option>\
                        <option value='1'>Teacher</option></select><br>\
                        <button id='cancelStaffForm'>Cancel</button>\
                        <button type='submit' id='addStaff'>Add</button>\
                    </form>\
                </div>";

    $('body').append(form);

    //These are here becuse they work only when the form is in the DOM but wheb when the oage loads it is not here, that is why it does not work any where else
    //Make the teacher form disappear when clicked on cancel button
    $("#cancelStaffForm").click(() => {
        event.preventDefault();
        $("#addTeacherModal").remove();
        return false;
    })

    $("#staffType").change(() => {
        if ($("#staffType").val() == 1) {
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

        if ($("#staffType").val() == 0) {
            $("#grade").remove();
            $(".select2-container").remove();
        }
        return false;
    })
    //Submit the add student form
    $("#addStaff").click(() => {
        event.preventDefault();
        var name = $("#staffName").val();
        var gender = $("#gender").val();
        var type = $("#staffType").val();
        var email = $("#staffEmail").val();
        var tel = $("#staffTel").val();
        var grade = $("#grade").select2('val')//values()//data('option-array-index');

        //var DOB = $("#studentDOB").val();
        var validName, valideEmail, validType, validGrade;

        if (name == "") {
            alert("Please enter a name");
        }
        else {
            validName = true;
        }

        if (email == "" || emailIsValid(email) !== true) {
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

        if ($("#staffType").val() == 1) {
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
            info.append('gender', gender);
            info.append('type', type);
            info.append('email', email);
            info.append('tel', tel);
            info.append('school', schoolId);
            if ($("#staffType").val() == 1) {
                info.append('grade', grade);
            }
            //info.append('DOB', DOB);
            //If adding teacher, a grade must be provided
            //If staff is teacher handler
            /*if ($("#staffType").val() == 1) {
                add(1, info);
            }
            //If staff is dean handler
            if ($("#staffType").val() == 0) {
                add(1, info);
            }*/
            //console.log(info)
            createStaff(info);
        }
        /*else {
            $("#addStudent").unbind('click');
        }*/
        return false;
    })
    return false;
}

function deleteModal() {
    $(".modal").remove();
}

function staffTitlesOptions() {
    var options = "";
    for (var i = 0; i < staffTypes.length; i++) {
        options += "<option value=" + i + ">" + staffTypes[i] + "</option>";
        //console.log(i)
    }
    return options;
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



function createSubject(data) {
    var url = "modules/insert.php?subject=";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                $(".modal").remove();
                alert("Subject successfully inserted")
                misc('container');
            }
            else {
                alert("Failed to insert subject")
            }

        }

    });
}
function createStudent(data) {
    var url = "modules/insert.php?student=";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                $(".modal").remove();
                alert("Student successfully inserted")
                $("#tab1").trigger('click')
            }
            else {
                alert("Failed to insert student")
            }
        }

    });
}
function createGrade(data) {
    var url = "modules/insert.php?stream=";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                $(".modal").remove();
                alert("Student successfully inserted")
                misc('container');
            }
            else {
                alert("Failed to insert student")
            }
        }

    });
}
function createStaff(data) {
    var url = "modules/insert.php?staff=";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                $(".modal").remove();
                alert("Student successfully inserted")
                makeTeachersTable(teachersArray, 'container');
            }
            else {
                alert("Failed to insert student")
            }
        }

    });
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
        url += "?school_name=" + as + "&id=" + schoolId;
    }

    if (who == 0 && what == 'schoolType') {
        url += "?school_type=" + as + "&id=" + schoolId;
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
