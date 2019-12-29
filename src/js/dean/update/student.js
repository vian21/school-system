function updateStudentName(studentId, newname) {
    var url = "modules/dean/update/student/student_name.php";
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

function updateStudentGrade(studentId, newGrade) {
    var url = "modules/dean/update/student/student_grade.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: studentId,
            grade: newGrade
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents()

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

function updateStudentGender(studentId, newGender) {
    var url = "modules/dean/update/student/student_gender.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            id: studentId,
            gender: newGender
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents()

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

function updateStudentDOB(studentId, newDOB) {
    var url = "modules/dean/update/student/student_dob.php";
    $.ajax({
        url: url,
        method:"post",
        data: {
            id: studentId,
            dob: newDOB
        },
        success: function (response) {
            if (response == 'ok') {
                fetchStudents()

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
