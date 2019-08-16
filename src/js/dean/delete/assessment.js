
function deleteAssessment(testId) {
    var msg = "<span id='saveMsg'>Data saved successfully</span>";
    var deleteFailMsg = "<span id='failedToDeleteMsg'>Failed to delete data</span>";
    $.ajax({
        url: "modules/delete.php",
        data: {
            assessment: '',
            id: testId
        },
        method: 'post',
        success: function (data) {
            if (data == "ok") {
                console.log(msg)
                $("#results").html("");
                $("#results").append(deletedMsg);
                $("#deletedMsg").fadeIn().delay(2000).fadeOut();
            }
            if (data == "ko" || data == "") {
                $("#results").html("");
                $("#results").append(deleteFailMsg);
                $("#failedToDeleteMsg").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}