function updateSchoolName(schoolId, newName) {
    var url = "modules/update.php?school_name";

    $.ajax({
        url: url,
        method:"post",
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

function updateSchoolType(schoolId, newType) {
    var url = "modules/update.php?school_type";

    $.ajax({
        url: url,
        method:"post",
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
