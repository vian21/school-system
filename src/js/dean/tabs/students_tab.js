
function subjectsLearntTable(student_index) {
    var number = 1;
    var table = "<table><tr><th>#</th><th>name</th><th>hours</th><th>type</th><th>status</th><th>action</th></tr>";
    var subjectsLearnt = studentsArray[student_index]['subjects'];
    console.log(subjectsLearnt)
    for (var i = 0; i < subjectsLearnt.length; i++) {
        table += "<tr>";

        table += "<td>" + number + "</td>";

        table += "<td>" + subjectsLearnt[i]['name'] + "</td>";

        table += "<td>" + subjectsLearnt[i]['hours'] + "</td>";

        table += "<td>" + subjectTypes[subjectsLearnt[i]['type']] + "</td>";

        table += "<td>" + subjectEnrollmentStatus[subjectsLearnt[i]['status']] + "</td>";

        /*
         * cell for action
         * blank when subject is compulsary
         *
         */

        //when subject is compulsary
        if (subjectsLearnt[i]['type'] == 0) {
            table += "<td></td>";
        }
        //when subject is elective and not enrolled in
        if (subjectsLearnt[i]['type'] == 1 && subjectsLearnt[i]['status'] == 0) {
            //function found at ../create/enrollment.js
            table += "<td><button class='new' onclick='enroll(" + studentsArray[student_index]['id'] + "," + subjectsLearnt[i]['id'] + "," + student_index + ")'>Enroll</button></td>";
        }
        //when subject is elective and enrolled in
        if (subjectsLearnt[i]['type'] == 1 && subjectsLearnt[i]['status'] == 1) {
            //function found at ../delete/enrollment.js
            table += "<td><button class='delete' onclick='disenroll(" + studentsArray[student_index]['id'] + "," + subjectsLearnt[i]['id'] + "," + student_index + ")'>unenroll</button></td>";
        }


        table += "<tr>";

        number++
    }
    table += "</table>";

    $("#subject_enrollment_table").html(table);
}


function studentsTab() {
    $("#container").html("<button class='new' id='addStudentButton'>Add</button>\
    <select name='student' id='searchStudent'>\
      <option></option>\
    </select>\
 <div id='info'>\
     <center><img src='' alt='' id='schoolImage'></center><br>\
    <span><b>Name: </b>"+ schoolName + "</span><br>\
    <span><b>Number of students :</b>"+ numberOfStudents + "</span><br>\
    <span><b>Number of male students :</b>"+ numberOfMaleStudents + "</span><br>\
    <span><b>Number of female students :</b>"+ numberOfFemaleStudents + "</span><br>\
    <span><b>Number of teachers :</b>"+ numberOfTeachers + "</span><br>\
</div>\
")
    addToForm();

    $("#schoolImage").attr("src", "src/img/uploaded/" + schoolImage);

    $("#searchStudent").on("change", function () {

        var position = $("#searchStudent").select2('val');

        var studentSelected = studentsArray[position];
        var studentInfoTemplate = "";
        var studentSelectedImage = studentSelected['image'];
        if (studentSelectedImage == "") {
            studentSelectedImage = "src/img/user.png";
        }
        var studentSelectedName = studentSelected['name'];
        var studentSelectedDOB = studentSelected['DOB'];
        var studentSelectedEmail = studentSelected['email'];
        var studentSelectedGrade = studentSelected['stream']['grade'] + ' ' + studentSelected['stream']['stream'];
        studentInfoTemplate += "<center><img id='studentImage' src='" + studentSelectedImage + "'></center>";
        studentInfoTemplate += "<b>Name : </b><input type='text' id='studentInfoName'  value='" + studentSelectedName + "'></br>";

        studentInfoTemplate += "<b>Gender:</b> <select id='studentInfoGender'>";
        studentInfoTemplate += "<option value='0'>Male</option>";
        studentInfoTemplate += "<option value='1'>Female</option>";
        studentInfoTemplate += "</select><br>";

        studentInfoTemplate += "<b>DOB : </b><input type='date' id='studentInfoDOB'  value='" + studentSelectedDOB + "'></br>";
        studentInfoTemplate += "<b>Grade : </b>";
        studentInfoTemplate += "<select id='studentInfoGrade'>";
        studentInfoTemplate += "<option value='" + studentSelected['id'] + "'>" + studentSelectedGrade + "</option>"
        studentInfoTemplate += "<option></option>"
        studentInfoTemplate += streamsOptions();
        studentInfoTemplate += "</select>";
        studentInfoTemplate += "<br><div id='msgBoard'></div>"

        //adding table for subjects learnt
        studentInfoTemplate += "<br><br><h5 style='text-decoration:underline;'>Subjects</h5>";
        studentInfoTemplate += "<div id='subject_enrollment_table'></div>";

        studentInfoTemplate += "<button class='delete' onclick='deleteStudent(" + studentSelected['id'] + ")'>Delete</button>";

        $("#info").html(studentInfoTemplate);

        //the subject table is added after the div has been created first
        subjectsLearntTable(position);
        //Make the gender selected
        $("#studentInfoGender").val(studentSelected['gender']).trigger('change');

        //Add listeners for change in student info
        $("#studentInfoName").change(function () {
            updateStudentName(studentSelected['id'], $("#studentInfoName").val())
        })

        //change gender
        $("#studentInfoGender").change(function () {
            updateStudentGender(studentSelected['id'], $("#studentInfoGender").val())
        })

        $("#studentInfoGrade").change(function () {
            if (studentSelected['stream']['id'] !== $("#studentInfoGrade").val()) {
                updateStudentGrade(studentSelected['id'], $("#studentInfoGrade").val())

            }
        })

        $("#studentInfoDOB").on('blur', function () {
            updateStudentDOB(studentSelected['id'], $("#studentInfoDOB").val())
        }
        )
    })

    $("#addStudentButton").click(function () { showStudentForm() });




    function showStudentForm() {
        var form = "<div id='addStudentModal' class='modal'>\
                        <form enctype='multipart/form-data'>\
                            <h4>Name :</h4>\
                                <input type='text' name='name' id='studentName' required  autocomplete='off'>\
                            \
                            \
                            <h4>Date of birth:</h4>\
                                <input type='date' name='DOB' id='studentDOB' required>\
                            \
                            \
                            <br>\
                            \
                            \
                            <h4>Student's email :</h4>\
                                <input type='email' name='email' id='studentEmail' autocomplete='off'>\
                            \
                            \
                            <h4>student's telephone number :</h4>\
                                <input type='number' name='tel' id='studentTel' autocomplete='off'>\
                            \
                            \
                            <h4>Grade :</h4><select name='grade' id='studentGrade' required>\
                                <option value=''></option>\
                            </select>\
                            \
                            \
                            <h4>Gender :</h4><select name='gender' id='gender' required>\
                                <option value='0'>Male</option>\
                                <option value='1'>Female</option>\
                            </select>\
                            <br>\
                            \
                            \
                            <button class='delete' type='button' id='cancelStudentForm'>Cancel</button>\
                            <button class='new' type='submit' id='addStudent'>Add</button>\
                        </form>\
                </div>";
        $('body').append(form);
        //These are here becuse they work only when the form is in the DOM but wheb when the oage loads it is not here, that is why it does not work any where else
        //Make the student form disappear when clicked on cancel button
        $("#cancelStudentForm").click(() => {
            event.preventDefault();
            $("#addStudentModal").remove();
        })

        //Append streams in select
        $("#studentGrade").append(streamsOptions());

        //Submit the add student form
        $("#addStudent").click((event) => {
            event.preventDefault();
            var name = $("#studentName").val();
            var DOB = $("#studentDOB").val();
            var email = $("#studentEmail").val();
            var tel = $("#studentTel").val();
            var yearStart = $("#startYear").val();
            var yearEnd = $("#endYear").val();
            var grade = $("#studentGrade").val();
            var gender = $("#gender").val();
            var school = schoolId;


            var validName, validYearStart, validYearEnd, validGrade, validDOB;
            var period = currentPeriodId;

            if (name == "") {
                alert("Please enter a name");
            }
            else {
                validName = true;
            }

            if (yearStart == "") {
                alert("Please enter the start of the academic year");
            }
            else {
                validYearStart = true;
            }

            if (yearEnd == "") {
                alert("Please enter the end of the academic year!");
            }
            else {
                validYearEnd = true;
            }

            if (grade == "") {
                alert("Please enter a grade");
            }
            else {
                validGrade = true;
            }

            if (DOB == "") {
                alert("Please enter a date of birth");
            }
            else {
                validDOB = true;
            }

            if (validName == true && validYearStart == true && validYearEnd == true && validGrade == true && validDOB == true) {
                var info = new FormData();

                info.append('name', name);
                info.append('email', email);
                info.append('tel', tel);
                info.append('gender', gender);
                info.append('grade', grade);
                info.append('DOB', DOB);
                info.append('period', period);
                info.append('school', schoolId)
                info.append('year', period)
                info.append('school', school)

                info.append('start', start)
                info.append('end', end);

                //add(2, info);
                $("#addStudent").attr('disabled', true);

                createStudent(info);
            }
        })
        return false;
    }
}