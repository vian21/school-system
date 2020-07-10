

function misc(container) {
    $('#' + container).html('');

    $('#' + container).append("<button id='schoolInfo'>Info</button>");
    $('#' + container).append("<button id='scale'>Grading scale</button>");

    $('#' + container).append("<button id='lists'>Lists</button>");
    $('#' + container).append("<button id='grades'>Grades</button>");
    $('#' + container).append("<button id='subjects'>subjects</button>");
    $('#' + container).append("<div id='board'><div>");

    $("#schoolInfo").click(function () {
        info('board');
    })

    $("#lists").click(function () {
        list('board');
    })

    $("#scale").click(function () {
        scale();
    })

    $("#grades").click(function () {
        gradesTable();
    })


    $("#subjects").click(function () {
        subjectsTable();
    })


    function info(id) {
        $("#" + id).html('')

        $("#" + id).append(`
        <center>
        <img src="" alt="School Image" id="schoolImage">
        </center>
        <br>
        <input type="file" id="imgChoose">
        <br>`);
        $("#schoolImage").attr("src", "src/img/uploaded/" + schoolImage);

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#schoolImage').attr('src', e.target.result);

                }
                reader.readAsDataURL(input.files[0]);

                var image = $("#imgChoose")[0].files[0];
                //@ src/js/dean/update/school_info.js
                updateSchoolImage(schoolId, image);
            }
        }
        $("#imgChoose").change(function () {
            readURL(this);
        });

        $("#" + id).append("<span>Name : </span>" + '<input id="schoolName" value="' + schoolName + '"><br>');
        $("#" + id).append("<span>Motto : </span>" + '<input id="schoolMotto" value="' + schoolMotto + '"><br>');

        var typeOptions;

        for (var i = 0; i < schoolTypes.length; i++) {
            typeOptions += "<option value=" + i + ">" + schoolTypes[i] + "</option>";
        }

        $("#" + id).append("<span>Type : </span>")
        $("#" + id).append("<select id='schoolType'>" + typeOptions + "</select><br>");
        $("#" + id).append("<span>Website : </span><input type='text' id='website' placeholder='School Website' value=" + schoolWebsite + "><br>");
        $("#" + id).append("<span>Email : </span><input type='email' id='email' placeholder='School email' value=" + schoolEmail + "><br>");
        $("#" + id).append("<div id='msgBoard'></div>")
        $("#schoolType").val(schoolType).trigger('change');


        //$("#imgChoose").change(function () {
        //})
        $("#schoolName").change(function () {
            var name = $("#schoolName").val();
            //@ src/js/dean/update/school_info.js

            updateSchoolName(schoolId, name);
        })

        $("#schoolMotto").change(function () {
            var motto = $("#schoolMotto").val();
            //@ src/js/dean/update/school_info.js

            updateSchoolMotto(schoolId, motto);
        })
        $("#website").change(function () {
            var website = $("#website").val();
            //@ src/js/dean/update/school_info.js
            updateSchoolWebsite(schoolId, website);
        })

        $("#email").change(function () {
            var email = $("#email").val();
            //@ src/js/dean/update/school_info.js
            updateSchoolEmail(schoolId, email);
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
                          <button class='new' id='generate'>Generate</button>");

        $("#grade").html("<option></option>" + streamsOptions());

        $("#generate").click(function () {
            event.preventDefault();

            var grade = $("#grade").val();

            if (grade !== '') {
                var url = "modules/dean/lists/students.php?grade=" + grade + "&school=" + schoolId+"&period="+currentPeriodId;
                window.open(url)
            }
        })
    }
}
function subjectsTable() {
    $("#board").html("<button id='newSubject' class='new'>New subject</button>");

    $("#newSubject").click(function () {
        newsubjectForm();
    })

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

        table += "<td><button  class='editSubject new' id=" + i + ">Edit</button></td>";
        table += "<td><button  class='deleteSubject delete' id=" + subjects[i]['id'] + ">Delete</button></td>";
        table += "</tr>";
    }


    table += "</table>";

    $("#board").append(table);

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
    $("#board").html("<button id='newGrade' class='new'>New grade</button><br>");

    $("#newGrade").click(function () {
        newGradeForm();
    })

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

        table += "<td><button  class='editGrade new' id=" + i + ">Edit</button></td>";
        table += "<td><button  class='deleteGrade delete' id=" + streams[i]['id'] + ">Delete</button></td>";
        table += "</tr>";
    }


    table += "</table>";

    $("#board").append(table);

    $(".editGrade").click(function () {
        console.log(i)
        editGradeForm($(this).attr('id'));
    })

    $(".deleteGrade").click(function () {
        console.log($(this).attr('id'))
        deleteGrade($(this).attr('id'));
    })

}


function scale() {
    $("#board").html("<button id='newGrading' class='new'>New Grading</button>");

    $("#newGrading").click(function () {
        newGradingForm();
    })

    var table = "<table>\
    <tr>\
        <th>#</th>\
        <th>Max</th>\
        <th>Min</th>\
        <th>Grade</th>\
        <th>GPA</th>\
        <th></th>\
        <th></th>\
    </tr>";

    var counter = 0;

    for (var i = 0; i < grading.length; i++) {
        counter++;

        table += "<tr>";
        table += "<td>" + counter + "</td>";
        table += "<td>" + grading[i]['max'] + "</td>";
        table += "<td>" + grading[i]['min'] + "</td>";

        table += "<td>" + grading[i]['grade'] + "</td>";
        table += "<td>" + grading[i]['gpa'] + "</td>";

        table += "<td><button  class='editGrading new' id=" + i + ">Edit</button></td>";
        table += "<td><button  class='deleteGrading delete' id=" + grading[i]['id'] + ">Delete</button></td>";
        table += "</tr>";
    }


    table += "</table>";

    $("#board").append(table);

    $(".editGrading").click(function () {
        //location: ../update/grading.js
        editGrading($(this).attr('id'));
    })

    $(".deleteGrading").click(function () {
        //location: ../delete/subject.js
        deleteGrading($(this).attr('id'));
    })

}