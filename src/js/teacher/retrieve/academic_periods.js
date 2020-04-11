async function fetchAcademicPeriods() {
    var url = "modules/dean/fetch/academic_periods.php";

    await $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId
        },
        success: function (response) {
            if (isJSON(response)) {
                periods = JSON.parse(response);

                setCurrentPeriod();

                generateTermOptions();

                fetchTests();
            }
            else{
                periods = '';
            }

        }
    })

    return false;
}

function setCurrentPeriod() {
    var lastPeriod = periods.length - 1;
    console.log(lastPeriod)
    currentPeriodId = periods[lastPeriod]['id'];
    currentPeriod = periods[lastPeriod]['period_name'];
    start=periods[lastPeriod]['year'][0];
    end=periods[lastPeriod]['year'][1];
}