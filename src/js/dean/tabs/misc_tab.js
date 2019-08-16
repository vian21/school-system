

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