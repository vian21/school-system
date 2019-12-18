function deleteSubject(id) {
    $.ajax({
        url: "modules/dean/delete/subject.php",
        method: "post",
        data: {
            subject: '',
            id: id
        },
        success: function (data) {
            if (data == 'ok') {
                fetchSubjects();

                alert("Subject successfully deleted");

                misc('container');
            }
            else {
                alert("Failed to delete subject");
            }
        }
    })
}