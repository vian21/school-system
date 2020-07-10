function deleteStaff(id) {
    if (confirm("Are you sure to delete staff?")) {
        $.ajax({
            url: app_url + "modules/dean/delete/staff.php?staff=" + id,
            success: function (data) {
                if (data == 'ok') {
                    fetchTeachers().then(function () {
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

}
