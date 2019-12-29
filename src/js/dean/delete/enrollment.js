function disenroll(student_id, subject_id, student_index) {
    $.ajax({
        url: "modules/dean/delete/enrollment.php",
        method: "post",
        data: {
            student: student_id,
            subject: subject_id,
        },
        success: function (data) {
            if (data == 'ok') {
                fetchStudents().then(function () {
                    alert("enrollment successfully removed")
                    subjectsLearntTable(student_index);
                })
            }
            else {
                alert("Failed to delete enrollment")
            }
        }
    })
}