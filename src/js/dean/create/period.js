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

            var name = periodTypes[periodType] + " " + periodNumber;
            $("#create").attr('disabled', true);

            var form = new FormData();
            form.append("id", schoolId);
            form.append("name", name);
            form.append("start", startYear);
            form.append("end", endYear);


            if (start !== undefined) {
                form.append("currentstart", start);
                form.append("currentend", end);
                form.append("currentperiod", currentPeriodId);


            }

            newPeriod(form);
        }
    })
}
function newPeriod(data) {
    var url = app_url + "modules/dean/create/period.php"

    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: function (response) {
            if (response == 'ok') {
                fetchAcademicPeriods().then(function () {
                    fetchStudents().then(function () {

                        alert("Period successfully created");

                        deleteModal();

                        studentsTab();
                    })
                });
            }
            else {
                $("#create").attr('disabled', false);

                alert("Failed to create period")
            }
        }
    })
}