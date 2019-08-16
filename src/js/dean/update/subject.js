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
                        fetchStreams();

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