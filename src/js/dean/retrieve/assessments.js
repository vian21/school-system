async function fetchTests() {
    var url = "modules/dean/fetch/assessments.php"

    await $.ajax({
        url: url,
        method: 'post',
        data: {
            school: schoolId,
            period: currentPeriodId
        },
        success: function (response) {
            if (isJSON(response)) {
                testsDone = JSON.parse(response);

                return true;
            }
            if (response == '') {
                testsDone = '';
            }

        }
    })
}