
function createAssessment(form) {
    $.ajax({
        url: 'modules/dean/create/assessment.php',
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

                marks();
            }
            else {
                $("#create").attr('disabled', false);

                alert("Failed to create assessement");
            }
        }
    })
}