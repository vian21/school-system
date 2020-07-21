function addClass(teacher) {
    var form = `
            <div class="modal">\
                <form>\
                <select id='subject'>\
                </select><br>\
                <button class='new' id='add'>Add</button>\
                <button class='new' id='cancel'>Cancel</button>\
                </form></div>`

    $('body').append(form);
    $("#subject").html("<option></option>" + subjectsGradeOptions()).select2();

    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    })

    $("#add").click(function () {
        event.preventDefault();
        var subject = $("#subject").val();
        $("#add").attr('disabled', true);

        $.ajax({
            method: 'post',
            url: app_url + "modules/dean/create/teaching.php",
            data: {
                teacher: teacher,
                subject: subject,
                start: start,
                end: end,
                period:currentPeriodId

            },
            success: function (response) {
                if (response == 'ok') {
                    fetchTeachers().then(function () {
                        alert("Class added to teacher")
                        makeTeachersTable();
                        deleteModal();
                    })

                }
                else {
                    $("#add").attr('disabled', false);

                    alert("Failed to add class to teacher")
                }
            }
        });
    })
}