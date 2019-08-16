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