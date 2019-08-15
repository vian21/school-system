function fetchTeachers() {
    var url = "modules/fetch.php?allteachers=&school_id=" + schoolId;
    $.ajax({
        url: url,
        success: function (response) {
            teachersArray = JSON.parse(response);

            addTeachersTosearchBox();

            return false;
        }
    })
}