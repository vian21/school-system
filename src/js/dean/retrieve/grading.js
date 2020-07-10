async function fetchGrading() {
    var url = app_url+"modules/dean/fetch/grading.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId
        },
        success: function (response) {
            if (isJSON(response)) {

                grading = JSON.parse(response);

                return true;
            }
            else {
                grading = '';
            }
        }
    })
}