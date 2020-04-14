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
    $("#subject").html("<option></option>" + subjectsGradeOptions())

    $("#add").click(function () {
        event.preventDefault();
        var subject = $("#subject").val();
        $("#add").attr('disabled', true);

        $.ajax({
            method: 'post',
            url: "modules/dean/create/teaching.php",
            data: {
                teacher: teacher,
                subject: subject,
                year: currentPeriodId

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