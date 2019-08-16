
function deleteStudent(id) {
    $.ajax({
        url: "modules/delete.php?student=" + id,
        success: function (data) {
            if (data == 'ok') {
                fetchStudents();

                dashboard();

                alert("Student successfully deleted");
                
                $("#container").html('')
            }
            else {
                alert("Failed to delete student");
            }
        }
    })
}