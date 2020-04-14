function deletePeriod() {
    $.ajax({
        url: "modules/dean/delete/period.php",
        method: "post",
        data: {
            id: currentPeriodId
        },
        success: function (data) {
            if (data == 'ok') {
                fetchAcademicPeriods().then(function () {
                    fetchStudents().then(function () {

                        alert("Period Deleted");

                        deleteModal();

                        studentsTab();
                    })
                });
            }
            else {
                alert("Failed to delete period")
            }
        }
    })
}