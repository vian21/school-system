
function createAssessment() {
    $.ajax({
        url: 'modules/insert.php?assessment=',
        method: "post",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: form,
        success: function (data) {
            if (data == "ok") {
                deleteModal();

                fetchTests();

                alert("Assessment successfully created.")
            }
            else {
                alert("Failed to create assessement");
            }
        }
    })
}