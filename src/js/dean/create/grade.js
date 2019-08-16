
function createGrade(data) {
    var url = "modules/insert.php?stream=";
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
                misc('container');
            }
            else {
                alert("Failed to insert student")
            }
        }

    });
}