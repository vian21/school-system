$(document).ready(function () {
    fetchSchoolInfo(schoolId).then(function () {
        info('info');
    });
    fetchTeachers().then(function () {
        makeTeachersTable();

    })
})

var typeOptions;

for (var i = 0; i < schoolTypes.length; i++) {
    typeOptions += "<option value=" + i + ">" + schoolTypes[i] + "</option>";
}

function info(id) {
    $("#" + id).html('')

    $("#" + id).append(`
    <center>
    <img src="" alt="School Image" id="schoolImage">
    </center>
    <br>
    <input type="file" id="imgChoose">
    <br>`);
    $("#schoolImage").attr("src", app_url + "src/img/uploaded/" + schoolImage);

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#schoolImage').attr('src', e.target.result);

            }
            reader.readAsDataURL(input.files[0]);

            var image = $("#imgChoose")[0].files[0];
            //@ src/js/dean/update/school_info.js
            updateSchoolImage(schoolId, image);
        }
    }
    $("#imgChoose").change(function () {
        readURL(this);
    });

    $("#" + id).append("<span>Name : </span>" + '<input id="schoolName" value="' + schoolName + '"><br>');
    $("#" + id).append("<span>Motto : </span>" + '<input id="schoolMotto" value="' + schoolMotto + '"><br>');

    var typeOptions;

    for (var i = 0; i < schoolTypes.length; i++) {
        typeOptions += "<option value=" + i + ">" + schoolTypes[i] + "</option>";
    }

    $("#" + id).append("<span>Type : </span>")
    $("#" + id).append("<select id='schoolType'>" + typeOptions + "</select><br>");
    $("#" + id).append("<span>Website : </span><input type='text' id='website' placeholder='School Website' value=" + schoolWebsite + "><br>");
    $("#" + id).append("<span>Email : </span><input type='email' id='email' placeholder='School email' value=" + schoolEmail + "><br>");

    $("#" + id).append("<span>Report Folder : </span><input type='text' id='reports' placeholder='Path' value=" + reportsFolder + "><br>");

    $("#" + id).append("<div id='msgBoard'></div>")
    $("#schoolType").val(schoolType).trigger('change');


    //$("#imgChoose").change(function () {
    //})
    $("#schoolName").change(function () {
        var name = $("#schoolName").val();
        //@ src/js/dean/update/school_info.js

        updateSchoolName(schoolId, name);
    })

    $("#schoolMotto").change(function () {
        var motto = $("#schoolMotto").val();
        //@ src/js/dean/update/school_info.js

        updateSchoolMotto(schoolId, motto);
    })
    $("#website").change(function () {
        var website = $("#website").val();
        //@ src/js/dean/update/school_info.js
        updateSchoolWebsite(schoolId, website);
    })

    $("#email").change(function () {
        var email = $("#email").val();
        //@ src/js/dean/update/school_info.js
        updateSchoolEmail(schoolId, email);
    })


    $("#reports").change(function () {
        var reports = $("#reports").val();
        //@ src/js/dean/update/school_info.js
        updateReportsFolder(schoolId, reports);
    })

    $("#schoolType").change(function () {
        var type = $("#schoolType").val();
        updateSchoolType(schoolId, type);
    })
}

$("#deleteSchool").click(function () {
    deleteSchool(schoolId).then(function () {
        window.open(app_url + "index.php", '_self')

    });
})


$("#pay").click(function () {
    var form = `<div id='payForm' class='modal'><form>
                <input type='number' id='months'><br><br>
                <button id='cancel' class='delete'>Cancel</button>
                <button id='paid' class='new'>Pay</button>
                </form></div>`
    $('body').append(form);

    $("#cancel").click(function () {
        $(".modal").remove();
    })

    $("#paid").click(function () {
        event.preventDefault();
        var months = $("#months").val();
        if (months == '') {
            alert("Enter Months to pay!")
        }
        else {
            pay(schoolId, schoolName, months);
        }
    })
})

$("#transactions").click(function () {
    window.open("transactions.php?school=" + schoolId, '_self');
})


$("#login").click(function () {
    window.open(app_url + "index.php?admin&school=" + schoolId)
})



function updateReportsFolder(schoolId, folder) {
    var url = app_url+"modules/admin/update/reports.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId,
            reports: folder
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