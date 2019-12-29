

function editGradeForm(position) {
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
        console.log(streamId, grade, stream)
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

            //var newData = new FormData();

            //newData.append('id', streamId);
            //newData.append('grade', grade);
            //newData.append('stream', stream.toUpperCase());

            var newData = {
                id: streamId,
                grade: grade,
                stream: stream.toUpperCase()
            }
            //add(4, form);
            updateGrade(newData)
        }
    })
}

function updateGrade(newInfo) {
    var url = "modules/dean/update/misc/grade.php";
    $.ajax({
        url: url,
        method: "post",
        //processData: false,
        data: newInfo,
        success: function (response) {
            if (response == 'ok') {
                deleteModal();
                fetchStreams()
                    .then(function () {
                        gradesTable()
                    })
                    .then(function () {
                        alert("Data successfully updated.");
                    })

            }
            else {
                alert("Failed to update data.");
            }

        }
    })
}