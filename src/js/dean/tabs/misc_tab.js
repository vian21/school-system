

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
        gradesTable();
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

    function info(id) {
        $("#" + id).html('')

        $("#" + id).append("<span>Name : </span>" + '<input id="schoolName" value="' + schoolName + '"><br>');
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
            updateSchoolName(schoolId, name);
        })

        $("#schoolType").change(function () {
            var type = $("#schoolType").val();
            updateSchoolType(schoolId, type);
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
function subjectsTable() {
    var table = "<table>\
    <tr>\
        <th>#</th>\
        <th>Name</th>\
        <th>Stream</th>\
        <th>Type</th>\
        <th>Hours</th>\
        <th></th>\
        <th></th>\
    </tr>";

    var counter = 0;

    for (var i = 0; i < subjects.length; i++) {
        counter++;

        table += "<tr>";
        table += "<td>" + counter + "</td>";
        table += "<td>" + subjects[i]['name'] + "</td>";

        /*
         *variable to contain the grade 
         *corresponding to the id given in the subjects array
         */
        var grade;

        //search for grade in streams array
        for (var j = 0; j < streams.length; j++) {
            if (streams[j]['id'] == subjects[i]['stream']) {
                grade = streams[j]['grade'] + ' ' + streams[j]['stream'];
                //break;
            }
        }
        table += "<td> Grade " + grade + "</td>";

        //subject type
        table += "<td>" + subjectTypes[subjects[i]['type']] + "</td>";
        table += "<td>" + subjects[i]['hours'] + "</td>";

        table += "<td><button class='editSubject' id=" + i + ">Edit</button></td>";
        table += "<td><button class='deleteSubject' id=" + subjects[i]['id'] + ">Delete</button></td>";
        table += "</tr>";
    }


    table += "</table>";

    $("#board").html(table);

    $(".editSubject").click(function () {
        //location: ../update/subject.js
        editSubject($(this).attr('id'));
    })

    $(".deleteSubject").click(function () {
        //location: ../delete/subject.js
        deleteSubject($(this).attr('id'));
    })

}
function gradesTable() {
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
        editGradeForm($(this).attr('id'));
    })

    $(".deleteGrade").click(function () {
        console.log($(this).attr('id'))
        deleteGrade($(this).attr('id'));
    })

}