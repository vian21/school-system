
function deleteStudent(id) {
    $.ajax({
        url: "modules/delete.php?student=" + id,
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