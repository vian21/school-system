async function deleteSchool(id) {
    if (confirm("Are you sure to delete school?")) {
        var url = app_url + "modules/admin/delete/school.php";
        $.ajax({
            url: url,
            method: "post",
            data: {
                id: id
            },
            success: function (response) {
                if (response == 'ok') {
                    alert("School Deleted");
                    $('.modal').remove();
                    schools = "";
                    fetchSchools().then(function () {
                        generateSchoolsTable();
                    });
                } else {
                    alert("Failed to delete School!")
                }
            }

        })
    }
}