function deleteGrading(id) {
    if (confirm("Are you sure to delete grading?")) {
        $.ajax({
            url: app_url + "modules/dean/delete/grading.php",
            method: "post",
            data: {
                id: id
            },
            success: function (data) {
                if (data == 'ok') {
                    fetchGrading().then(function () {
                        alert("Grading successfully deleted");

                        scale()
                    })


                }
                else {
                    alert("Failed to delete grading");
                }
            }
        })
    }

}