function updateStaffName(staffId, newname) {
    var url = app_url+"modules/dean/update/staff/staff_name.php";
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
    var url = app_url+"modules/dean/update/staff/staff_email.php";
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
    var url = app_url+"modules/dean/update/staff/staff_gender.php";
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
    var url = app_url+"modules/dean/update/staff/staff_type.php";
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
    var url = app_url+"modules/dean/update/staff/staff_tel.php";
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

function updateStaffPassword(staffId, newPassword) {
    var url = app_url+"modules/dean/update/staff/staff_password.php";
    $.ajax({
        url: url,
        method: "post",
        data: {
            password: newPassword,
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