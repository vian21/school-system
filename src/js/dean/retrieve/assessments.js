function fetchTests() {
    var url = "modules/fetch.php?tests=" + currentPeriodId;
    $.ajax({
        url: url,
        success: function (response) {
            testsDone = JSON.parse(response);

            dashboard();

            return false;
        }
    })
}