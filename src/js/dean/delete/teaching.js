function removeClass(teacher,subject) {
    $.ajax({
        url: "modules/dean/delete/teaching.php",
        method: "post",
        data: {
            teacher: teacher,
            subject:subject,
            year:currentPeriodId
        },
        success: function (data) {
            if (data == 'ok') {

                fetchTeachers().then(function () {
                    alert("Class removed from teacher");

                    makeTeachersTable();
                })
            }
            else {
                alert("Failed to remove class");
            }
        }
    })
}