async function fetchTeachers() {
    var url = "modules/fetch.php?allteachers=&school_id=" + schoolId;
    await $.ajax({
        url: url,
        success: function (response) {
            teachersArray = JSON.parse(response);
            addTeachersTosearchBox();
        }
    })
    return false;
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