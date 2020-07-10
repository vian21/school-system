async function fetchPeriods() {
    var url = app_url + "modules/student/retrive/periods.php";

    await $.ajax({
        url: url,
        method: "post",
        data: {
            student: userId
        },
        success: function (response) {
            if (isJSON(response)) {
                periods = JSON.parse(response);
            }
        }

    })
}