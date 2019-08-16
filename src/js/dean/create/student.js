
function createStudent(data) {
    var url = "modules/insert.php?student=";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                $(".modal").remove();
                alert("Student successfully inserted")
                $("#tab1").trigger('click')
            }
            else {
                alert("Failed to insert student")
            }
        }

    });
}