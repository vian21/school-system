function updateStudentName(studentId, newname) {
    var url = app_url+"modules/dean/update/student/student_name.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            name: newname,
            id: studentId
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents().then(function () {
                    addToForm();
                })

                $("#msgBoard").html('');
                $("#msgBoard").append("Data saved successfully")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();



            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStudentAdmission(studentId, newAdmission) {
    var url = app_url+"modules/dean/update/student/student_admission.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            admission: newAdmission,
            id: studentId
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents().then(function () {
                    addToForm();
                })

                $("#msgBoard").html('');
                $("#msgBoard").append("Data saved successfully")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();



            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStudentGrade(studentId, newGrade) {
    var url = app_url+"modules/dean/update/student/student_grade.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            school: schoolId,
            id: studentId,
            grade: newGrade,
            period: currentPeriodId,
            start: start,
            end: end
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents().then(function () {

                    alert("Grade changed")
                    studentsTab();
                })
            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStudentGender(studentId, newGender) {
    var url = app_url+"modules/dean/update/student/student_gender.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: studentId,
            gender: newGender
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents().then(function () {

                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })
            }
            else {

                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStudentDOB(studentId, newDOB) {
    var url = app_url+"modules/dean/update/student/student_dob.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: studentId,
            dob: newDOB
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents().then(function () {

                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })

            }
            else {

                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}
