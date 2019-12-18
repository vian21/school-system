function deleteGrade(id) {
    $.ajax({
        url: "modules/dean/delete/stream.php",
        method: "post",
        data: {
            id: id
        },
        success: function (data) {
            if (data == 'ok') {
                fetchStreams().then(function () {

                    alert("Grade successfully deleted");

                    gradesTable();
                });
            }
            else {
                alert("Failed to delete grade");
            }
        }
    })
}