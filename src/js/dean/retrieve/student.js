async function fetchStudents() {
    var url = "modules/dean/fetch/students.php?school_id=" + schoolId;

    await $.ajax({
        url: url,
        success: function (response) {
            if (isJSON(response)) {
                studentsArray = JSON.parse(response);

                return true;
            }
            else {
                studentsArray = '';
            }
        }
    })
}


//add students to search form
function addToForm() {
    $("#searchStudent").html('')
    $("#searchStudent").append("<option></option>");
    for (var i = 0; i < studentsArray.length; i++) {
        $("#searchStudent").select2({
            data: [
                { id: i, text: studentsArray[i]['name'] + " " },
                //subjects_gradeOptions()

            ]
        });
    }
    return false;
}