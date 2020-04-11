
function createStudent(data) {
    var url = "modules/dean/create/student.php";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                fetchStudents().then(function () {
                    deleteModal();

                    alert("Student successfully inserted")
                    $("#tab1").trigger('click')
                })
            }
            else {
                alert("Failed to insert student")
            }
        }

    });
}