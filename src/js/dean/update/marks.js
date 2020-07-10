function updateMark(info) {
    $.ajax({
        url: app_url+"modules/dean/update/student/student_mark.php",
        method: "post",
        data: info,
        success: function (data) {
            if (data == "ok") {
                $("#msgBoard").html('')
                $("#msgBoard").append("Data saved successfully");
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
            if (data == "ko" || data == "") {
                $("#msgBoard").html('')
                $("#msgBoard").append("Failed to save data");
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }

    })
}