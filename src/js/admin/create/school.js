function createSchool(name, type) {
    url = app_url + 'modules/admin/create/school.php';
    $.ajax({
        url: url,
        method: "post",
        data: {
            name: name,
            type: type
        },
        success: function (response) {
            if (response = 'ok') {
                alert("School Created");
                $('.modal').remove();
                fetchSchools().then(function(){
                    generateSchoolsTable();
                });

            }
            else {
                alert("Failed to create school")
            }
        }
    })
}