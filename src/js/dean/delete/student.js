
function deleteStudent(id) {
    $.ajax({
        url: "modules/delete.php?student=" + id,
        success: function (data) {
            if (data == 'ok') {
                alert("Student successfully deleted");

                studentstab();
            }
            else {
                alert("Failed to delete student");
            }
        }
    })
}