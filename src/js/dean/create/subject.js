function newsubjectForm() {
    $('body').append("<div class='modal'>\
                        <form>\
                            <h4>Subject Name</h4>\
                            <input type='text' id='subjectName'>\
                            <h4>Grade</h4>\
                            <select id='grade'></select>\
                            <h4>Type</h4>\
                            <select id='type'>\
                                <option value='0'>Compulsary</option>\
                                <option value='1'>Elective</option>\
                            </select>\
                            <h4>Hours per week</h4>\
                            <input type='number' name='hours' id='hours'>\
                            <br>\
                            <button class='delete' id='cancel'>Cancel</button>\
                            <button class='new' id='create' type='submit'>Create</button>\
                        </form>\
                      </div>");

    $("#grade").html(streamsOptions());

    $("#cancel").click(function () {
        event.preventDefault();

        deleteModal();

        return false;
    })

    $("#create").click(function () {
        event.preventDefault();

        var subjectName = $("#subjectName").val();
        var grade = $("#grade").val();

        /*
         * 0 for compulsary
         * 1 for elective
         */
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
            var form = new FormData();

            form.append('name', subjectName);
            form.append('grade', grade)
            form.append('type', type)
            form.append('hours', hoursPerWeek);
            form.append('id', schoolId)

            //add(3, form);
            $("#create").attr('disabled', true);

            createSubject(form);
        }
    })
}

function createSubject(data) {
    var url = app_url+"modules/dean/create/subject.php";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                fetchSubjects().then(function () {
                    fetchStudents();
                    deleteModal();
                    alert("Subject successfully inserted")
                    subjectsTable();
                })

            }
            else {
                $("#create").attr('disabled', false);

                alert("Failed to insert subject")
            }

        }

    });
}