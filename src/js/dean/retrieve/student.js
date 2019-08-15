function fetchStudents() {
    var url = "modules/fetch.php?allStudents=&school_id=" + schoolId;
    $.ajax({
        url: url,
        success: function (response) {
            studentsArray = JSON.parse(response);
            return false;
        }
    })
}