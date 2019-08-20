async function fetchAcademicPeriods() {
    var url = "modules/fetch.php?periods";

    await $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId
        },
        success: function (response) {
            periods = JSON.parse(response);

            setCurrentPeriod();

            generateTermOptions();

            fetchTests();
        }
    })

    return false;
}

/*function setCurrentPeriod() {
    var positionInArray;

    for (var h = 0; h < periods.length; h++) {
        currentYearId = periods[h]['id'];
        currentYear = periods[h]['year'];
        positionInArray = h;
        //console.log(currentYear)
    }
    var arrayOfPeriods = periods[positionInArray]['periods'];

    for (var i = 0; i < arrayOfPeriods.length; i++) {
        currentPeriodId = arrayOfPeriods[i]['id'];
        currentPeriod = arrayOfPeriods[i]['name'];

    }
    return false;
}*/

function setCurrentPeriod() {
    var lastPeriod = periods.length - 1;
    currentPeriodId = periods[lastPeriod]['id'];
    currentPeriod = periods[lastPeriod]['period_name'];
}