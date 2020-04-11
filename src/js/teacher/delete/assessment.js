
function deleteAssessment(testId) {
    $.ajax({
        url: "modules/dean/delete/assessment.php",
        data: {
            assessment: '',
            id: testId
        },
        method: 'post',
        success: function (data) {
            if (data == "ok") {
                fetchTests().then(function () {
                    alert("Test deleted");

                    marks();
                })

            }
            else {
                $("#results").append("<span id='failedToDeleteMsg'>Failed to delete data</span>");

                $("#failedToDeleteMsg").fadeIn()
                    .delay(2000).fadeOut()
                    .delay(1000).remove();
            }
        }
    })
}