function editGrading(position) {
    var form = "<div class='modal'><form>"
    form += "<h4>Max</h4>";
    form += "<input type='number' id='max' class='" + grading[position]['id'] + "' value=" + grading[position]['max'] + ">"

    form += "<h4>Min</h4>";
    form += "<input type='number' id='min' class='" + grading[position]['id'] + "' value=" + grading[position]['min'] + ">"

    form += "<h4>Grade</h4>";
    form += "<input type='text' id='grade' class='" + grading[position]['id'] + "' value=" + grading[position]['grade'] + ">"

    form += "<h4>GPA</h4>";
    form += "<input type='number' id='gpa' class='" + grading[position]['id'] + "' value=" + grading[position]['gpa'] + "><br><br>"

    form += "<button id='cancel' class='delete'>Cancel</button>"
    form += "<button id='save' type='submit'>Save</button>"
    form += "</form></div>";

    $('body').append(form);

    $("#cancel").click(function () {
        event.preventDefault();

        deleteModal();

        return false;
    })

    $("#save").click(function () {
        event.preventDefault();

        var id = $("#max").attr('class');
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

            form.append('id', id);

            form.append('max', max);
            form.append('min', min);
            form.append('grade', grade.toUpperCase());
            form.append('gpa', gpa);

            $("#save").attr('disabled', true);

            updateGrading(form);

        }
    })
}

function updateGrading(info) {
    $.ajax({
        url: app_url + "modules/dean/update/misc/grading.php",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: info,
        success: (data) => {
            if (data == 'ok') {
                fetchGrading().then(function () {
                    alert("Grading edited.");
                    scale();
                    deleteModal();
                })


            }
            else {
                $("#save").attr('disabled', true);

                alert("Failed to edit Grading");
            }
        }

    });
}