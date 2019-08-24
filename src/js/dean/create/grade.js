
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

function createGrade(data) {
    $.ajax({
        url: "modules/insert.php?stream",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
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