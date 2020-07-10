function editPeriodForm() {
    var htmlForm = "<div class='modal'><form>";
    htmlForm += "<input type='number' id='startYear' placeholder='From' value=" + start + "><br>"
    htmlForm += "<input type='number' id='endYear' placeholder='To' value=" + end + "><br>"
    htmlForm += "<select id='type'>"
    htmlForm += "<option value=0>Term</option>"
    htmlForm += "<option value=1>Semester</option>"
    htmlForm += "</select><br>"
    htmlForm += "<input type='number' id='periodNumber' placeholder='Number'><br>"
    htmlForm += "<button class='new' id='create'>Save</button><button class='delete' id='cancel'>Cancel</button><button class='delete' id='delete'>delete</button></form></div>";
    $('body').append(htmlForm);

    $("#cancel").click(function () {
        event.preventDefault();

        deleteModal();
    })

    $("#delete").click(function () {
        event.preventDefault();

        deletePeriod();
    })

    $("#create").click(function () {
        event.preventDefault();

        var startYear = $("#startYear").val();
        var endYear = $("#endYear").val();
        var periodType = $("#type").val();
        var periodNumber = $("#periodNumber").val();

        var validStart, validEnd, validNumber;

        if (startYear == '') {
            alert("The beginning of the year")
        }
        else {
            validStart = true;
        }
        if (endYear == '') {
            alert("Enter an end year")
        }
        else {
            validEnd = true;
        }
        if (periodNumber == '') {
            alert("Enter a period number")
        }
        else {
            validNumber = true;
        }

        if (validStart == true && validEnd == true && validNumber == true) {
            var periodName = periodTypes[periodType] + ' ' + periodNumber;

            editPeriod(currentPeriodId, periodName, startYear, endYear);
        }
    })
}

function editPeriod(periodId, name, start, end) {
    var url = app_url+"modules/dean/update/misc/period.php"

    $.ajax({
        url: url,
        method: "post",
        data: {
            period: periodId,
            school: schoolId,
            name: name,
            start: start,
            end: end
        },
        success: function (response) {
            if (response == 'ok') {
                fetchAcademicPeriods().then(function () {
                    fetchStudents().then(function () {

                        alert("Period successfully edited");

                        deleteModal();

                        studentsTab();
                    })
                });
            }
            else {
                $("#create").attr('disabled', false);

                alert("Failed to edit period")
            }
        }
    })
}