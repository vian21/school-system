function updateSchoolImage(schoolId, newImage) {
    var url = app_url+"modules/dean/update/school/school_image.php";
    var form = new FormData();
    form.append('id', schoolId);

    form.append('image', newImage);

    form.append('old', schoolImage);


    $.ajax({
        url: url,
        method: "post",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: form,
        success: function (response) {
            if (response == 'ok') {
                fetchSchoolInfo().then(function () {
                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })
            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateSchoolName(schoolId, newName) {
    var url = app_url+"modules/dean/update/school/school_name.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId,
            name: newName
        },
        success: function (response) {
            if (response == 'ok') {
                fetchSchoolInfo().then(function () {
                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })
            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}
function updateSchoolMotto(schoolId, newMotto) {
    var url = app_url+"modules/dean/update/school/school_motto.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId,
            motto: newMotto
        },
        success: function (response) {
            if (response == 'ok') {
                fetchSchoolInfo().then(function () {
                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })
            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}
function updateSchoolType(schoolId, newType) {
    var url = app_url+"modules/dean/update/school/school_type.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId,
            type: newType
        },
        success: function (response) {
            if (response == 'ok') {
                fetchSchoolInfo().then(function () {
                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })
            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}

function updateSchoolWebsite(schoolId, newWebsite) {
    var url = app_url+"modules/dean/update/school/school_website.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId,
            website: newWebsite
        },
        success: function (response) {
            if (response == 'ok') {
                fetchSchoolInfo().then(function () {
                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })
            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}
function updateSchoolEmail(schoolId, newEmail) {
    var url = app_url+"modules/dean/update/school/school_email.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId,
            email: newEmail
        },
        success: function (response) {
            if (response == 'ok') {
                fetchSchoolInfo().then(function () {
                    $("#msgBoard").html('');
                    $("#msgBoard").append("Data saved successfully")
                    $("#msgBoard").fadeIn().delay(2000).fadeOut();
                })
            }
            else {
                $("#msgBoard").html('');
                $("#msgBoard").append("Failed to save data")
                $("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
        }
    })
}