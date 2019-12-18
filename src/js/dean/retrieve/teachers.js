async function fetchTeachers() {
    var url = "modules/dean/fetch/teachers.php?school_id=" + schoolId;
    await $.ajax({
        url: url,
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


function addTeachersTosearchBox() {
    $("#searchTeacherBox").html('')
    $("#searchTeacherBox").append("<option></option>");

    for (var i = 0; i < teachersArray.length; i++) {
        $("#searchTeacherBox").select2({
            data: [
                { id: i, text: teachersArray[i]['name'] }
            ]
        });
    }

    return false;
}