async function fetchTeachers() {
    var url = app_url+"modules/dean/fetch/teachers.php";
    await $.ajax({
        url: url,
        method:"post",
        data:{
            school_id:schoolId,
            start:start,
            end:end
        },
        success: function (response) {
            if (isJSON(response)) {
                teachersArray = JSON.parse(response);
                addTeachersTosearchBox();

                return true;
            }
            else {
                teachersArray = '';
            }
        }
    })
}