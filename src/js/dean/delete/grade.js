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
                fetchStreams();

                alert("Grade successfully deleted");

                misc('container');
            }
            else {
                alert("Failed to delete grade");
            }
        }
    })
}