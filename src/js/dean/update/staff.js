function updateStaffName(staffId, newname) {
    var url = "modules/update.php?staff_name";
    $.ajax({
        url: url,
        method: "post",
        data: {
            name: newname,
            id: staffId
        },
        success: function (response) {
            if (response == 'ok') {
                fetchTeachers().then(addTeachersTosearchBox())

                $("#msgBoard").html('');
                $("#msgBoard").append("Data saved successfully")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();

            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStaffEmail(staffId, newEmail) {
    var url = "modules/update.php?staff_email";
    $.ajax({
        url: url,
        method: "post",
        data: {
            email: newEmail,
            id: staffId
        },
        success: function (response) {
            if (response == 'ok') {
                fetchTeachers();

                $("#msgBoard").html('');
                $("#msgBoard").append("Data saved successfully")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();

            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStaffGender(staffId, newGender) {
    var url = "modules/update.php?staff_gender";
    $.ajax({
        url: url,
        method: "post",
        data: {
            gender: newGender,
            id: staffId
        },
        success: function (response) {
            if (response == 'ok') {
                fetchTeachers();

                $("#msgBoard").html('');
                $("#msgBoard").append("Data saved successfully")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();

            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStaffJob(staffId, newJob) {
    var url = "modules/update.php?staff_title";
    $.ajax({
        url: url,
        method: "post",
        data: {
            title: newJob,
            id: staffId
        },
        success: function (response) {
            if (response == 'ok') {
                fetchTeachers();

                $("#msgBoard").html('');
                $("#msgBoard").append("Data saved successfully")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();

            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateStaffTel(staffId, newTel) {
    var url = "modules/update.php?staff_tel";
    $.ajax({
        url: url,
        method: "post",
        data: {
            tel: newTel,
            id: staffId
        },
        success: function (response) {
            if (response == 'ok') {
                fetchTeachers();

                $("#msgBoard").html('');
                $("#msgBoard").append("Data saved successfully")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();

            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}
