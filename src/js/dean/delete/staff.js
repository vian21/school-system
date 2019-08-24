function deleteStaff(id) {
    $.ajax({
        url: "modules/delete.php?staff=" + id,
        success: function (data) {
            if (data == 'ok') {
                fetchTeachers().then(function(){
                    alert("Staff successfully deleted");

                    makeTeachersTable();
                })

            }
            else {
                alert("Failed to delete staff");
            }
        }
    })
}
