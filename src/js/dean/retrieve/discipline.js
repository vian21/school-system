async function fetchStudentDiscipline(id) {
    var url = app_url + "modules/dean/fetch/discipline.php";

    await $.ajax({
        url: url,
        method: "post",
        data: {
            id: id,
            period: currentPeriodId,
            start: start,
            end: end,
            school: schoolId
        },
        success: function (response) {
            if (isJSON(response)) {
                studentDisciplineInfo = JSON.parse(response);
                discipline();
            }
            else {
                discipline();
            }
        }
    })
}