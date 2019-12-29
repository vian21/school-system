function enroll(student_id, subject_id, student_index) {
    $.ajax({
        url: "modules/dean/create/enrollment.php",
        method: "post",
        data: {
            student: student_id,
            subject: subject_id,
            period:currentPeriodId,
            //start and end of year contained in the global variables 'start' and 'end'
            start:start,
            end:end,
        },
        success: function (data) {
            if (data == 'ok') {
                fetchStudents().then(function () {
                    alert("Student enrolled successfully");
                    subjectsLearntTable(student_index);
                })
            }
            else {
                alert("Failed to enroll student")
            }
        }
    })
}