function deleteStaff(id) {
    $.ajax({
        url: "modules/delete.php?staff=" + id,
        success: function (data) {
            if (data == 'ok') {
                fetchTeachers();

                alert("Staff successfully deleted");
                
                $("#container").html('')
            }
            else {
                alert("Failed to delete staff");
            }
        }
    })
}
