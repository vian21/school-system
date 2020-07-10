
function deleteStudent(id) {
    if (confirm("Are you sure to delete student?")) {
        $.ajax({
            url: app_url + "modules/dean/delete/student.php?student=" + id,
            success: function (data) {
                if (data == 'ok') {
                    fetchStudents().then(function () {
                        alert("Student successfully deleted");

                        studentsTab();
                    })
                }
                else {
                    alert("Failed to delete student");
                }
            }
        })
    }

}