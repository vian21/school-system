async function fetchSubjectsTaught() {
    var url = "modules/teacher/retrieve/subjects.php";

    await $.ajax({
        url: url,
        method: 'post',
        data: {
            user: userId,
            year: currentPeriodId
        },
        success: function (response) {
            if (isJSON(response)) {
                var info = JSON.parse(response);
                subjects = info;

            }

            return true;
        }
    })
}