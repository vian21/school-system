function editSubject(position) {
    var form = "<div class='modal'><form>"
    form += "<h4>Name</h4>";
    form += "<input type='text' name='name' id='name' class='" + subjects[position]['id'] + "' value=" + subjects[position]['name'] + ">"

    form += "<h4>Grade</h4>";
    form += "<select id='grade'></select>"

    form += "<h4>Type</h4>";
    form += "<select id='type'>"
    form += "<option value=0>Compulsary</option>"
    form += "<option value=1>Elective</option>"
    form += "</select><br>"
    form += "<input type='number' name='hours' id='hours' value=" + subjects[position]['hours'] + "><br>"
    form += "<button id='cancel'>Cancel</button>"
    form += "<button id='save' type='submit'>Save</button>"
    form += "</form></div>";

    $('body').append(form);

    //append options for grades
    $("#grade").append(streamsOptions())

    for (var j = 0; j < streams.length; j++) {
        if (streams[j]['id'] == subjects[position]['stream']) {
            //make current grade default
            $("#grade").val(streams[j]['id']).trigger('change')

        }
    }

    $("#type").val(subjects[position]['type']).trigger('change')

    $("#cancel").click(function () {
        event.preventDefault();

        deleteModal();

        return false;
    })

    $("#save").click(function () {
        event.preventDefault();

        var id = $("#name").attr('class');
        var name = $("#name").val();
        var grade = $("#grade").val();
        var type = $("#type").val();
        var hours = $("#hours").val();

        var validName, validHours;

        if (name !== '') {
            validName = true;
        }
        else {
            alert("Enter a subject name");
        }
        if (hours !== '') {
            validHours = true;
        }
        else {
            alert("Enter hours");
        }

        if (validName == true && validHours == true) {
            //console.log("ok")

            var form = new FormData();

            form.append('id', id);
            form.append('name', name);
            form.append('grade', grade);
            form.append('type', type);
            form.append('hours', hours);
            //add(4, form);
            $("#save").attr('disabled', true);

            updateSubject(form);

        }
    })
}

function updateSubject(info) {
    $.ajax({
        url: "modules/dean/update/misc/subject.php",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: info,
        success: (data) => {
            if (data == 'ok') {
                fetchSubjects().then(fetchStudents()).then(function () {
                    alert("Subject edited.");
                    subjectsTable();
                    deleteModal();

                })

            }
            else {
                $("#save").attr('disabled', true);

                alert("Failed to edit subject");
            }
        }

    });
}