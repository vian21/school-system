function fetchSchoolInfo() {
    var url = "modules/fetch.php?school_info=&user=" + userId;
    $.ajax({
        url: url,
        success: function (response) {
            var info = JSON.parse(response);
            schoolId = info['id'];
            schoolName = info['name'];
            schoolType = info['type'];
            //Fecth all teachers and add them to and array and make a table using the array
            fetchTeachers();
            //fetch all student and add them to an array and add them to select option list using the student's array
            fetchStudents();
        }
    })
}