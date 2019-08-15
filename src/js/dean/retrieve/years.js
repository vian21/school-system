function fetchAcademicYears() {
    var url = "modules/fetch.php?periods=";

    $.ajax({
        url: url,
        method: "get",
        success: function (response) {
            periods = JSON.parse(response);

            setCurrentPeriod();

            generateTermOptions('termOptions');

            fetchTests();
            return false;
        }
    })
}

function setCurrentPeriod() {
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
}