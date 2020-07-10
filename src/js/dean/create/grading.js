function newGradingForm() {
    $('body').append("<div class='modal'>\
                        <form>\
                            <h4>Max</h4>\
                            <input type='number' id='max'>\
                            <h4>Min</h4>\
                            <input type='number'  id='min'>\
                            <h4>Grade</h4>\
                            <input type='text'  id='grade'>\
                            <h4>GPA</h4>\
                            <input type='number'  id='gpa'>\
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

        var max = $("#max").val();
        var min = $("#min").val();
        var grade = $("#grade").val();

        var gpa = $("#gpa").val();

        var validMax, validMin, validGrade, validGpa = false;
        if (max == '') {
            alert("Enter maximum marks");
        }
        else {
            validMax = true;
        }

        if (min == '') {
            alert("Enter minimum marks");
        }
        else {
            validMin = true;
        }

        if (grade == '') {
            alert("Enter a grade");
        }
        else {
            validGrade = true;
        }
        if (gpa == '') {
            alert("Enter GPA");
        }
        else {
            validGpa = true;
        }
        if (validMax == true && validMin == true && validGrade == true && validGpa == true) {
            var form = new FormData();

            form.append('max', max);
            form.append('min', min)
            form.append('grade', grade.toUpperCase())
            form.append('gpa', gpa);
            form.append('school', schoolId)

            //add(3, form);
            $("#create").attr('disabled', true);

            createGrading(form);
        }
    })
}

function createGrading(data) {
    var url = app_url + "modules/dean/create/grading.php";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                fetchGrading().then(function () {
                    deleteModal();
                    alert("Grading successfully applied")
                    scale();
                })


            }
            else {
                $("#create").attr('disabled', false);

                alert("Failed to apply grading")
            }

        }

    });
}