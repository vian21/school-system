function deleteGrade(id) {
    $.ajax({
        url: "modules/delete.php",
        method: "post",
        data: {
            grade: '',
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