function deleteSubject(id) {
    if (confirm("Are you sure to delete subject?")) {
        $.ajax({
            url: app_url + "modules/dean/delete/subject.php",
            method: "post",
            data: {
                subject: '',
                id: id
            },
            success: function (data) {
                if (data == 'ok') {
                    fetchSubjects().then(function () {
                        alert("Subject successfully deleted");

                        subjectsTable()
                    })


                }
                else {
                    alert("Failed to delete subject");
                }
            }
        })
    }

}