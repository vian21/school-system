function newPeriodForm() {
    var htmlForm = "<div class='modal'>\
                    <form>\
                        <input type='number' id='startYear' placeholder='From'><br>\
                        <input type='number' id='endYear' placeholder='To'><br>\
                        <select id='type'>\
                            <option value=0>Term</option>\
                            <option value=1>Semester</option>\
                        </select><br>\
                        <input type='number' id='periodNumber' placeholder='Number'><br>\
                        <button class='delete' id='cancel'>Cancel</button>\
                        <button class='new' id='create'>Create</button>\
                    </form>\
                </div>";
    $('body').append(htmlForm);

    $("#cancel").click(function () {
        event.preventDefault();

        deleteModal();
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
            var academicYear = startYear + '-' + endYear;
            var periodName = periodTypes[periodType] + ' ' + periodNumber;

            newPeriod(academicYear, periodName);
        }
    })
}
function newPeriod(year, name) {
    var url = "modules/dean/create/period.php"

    $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId,
            name: name,
            year: year
        },
        success: function (response) {
            if (response == 'ok') {
                fetchAcademicPeriods().then(function () {
                    alert("Period successfully created");

                    deleteModal();

                    studentsTab();
                });
            }
            else {
                alert("Failed to create period")
            }
        }
    })
}