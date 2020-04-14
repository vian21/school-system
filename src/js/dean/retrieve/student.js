async function fetchStudents() {
    var url = "modules/dean/fetch/students.php";

    await $.ajax({
        url: url,
        method: "post",
        data: {
            year: currentPeriodId,
            school_id: schoolId
        },
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