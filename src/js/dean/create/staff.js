
function showStaffForm() {
    var form = "<div id='addTeacherModal' class='modal'>\
                    <form id='addStaffForm'>\
                        <h4>Name</h4><input type='text' name='name' id='staffName' required  autocomplete='off'>\
                        <br>\
                        <h4>Gender :</h4><select name='gender' id='gender' required>\
                            <option value='0'>Male</option>\
                            <option value='1'>Female</option>\
                        </select>\
                        <br>\
                        <h4>Email</h4><input type='email' name='email' id='staffEmail' autocomplete='off'>\
                         <h4>Telephone</h4>\
                         <input type='number' name='tel' id='staffTel' autocomplete='off'>\
                        <h4>Type</h4>\
                        <select id='staffType'>\
                        <option value='1'>Dean</option>\
                        <option value='2'>Teacher</option>\
                        <option value='3'>Accountant</option>\
                        </select><br>\
                        <h4>password: </h4>\
                        <input type='password' id='password' autocomplete='new-password'><br>\
                        <button class='delete' id='cancelStaffForm'>Cancel</button>\
                        <button class='new' type='submit' id='addStaff'>Add</button>\
                    </form>\
                </div>";

    $('body').append(form);

    //These are here becuse they work only when the form is in the DOM but wheb when the oage loads it is not here, that is why it does not work any where else
    //Make the teacher form disappear when clicked on cancel button
    $("#cancelStaffForm").click(() => {
        event.preventDefault();
        $("#addTeacherModal").remove();
        return false;
    })

    $("#staffType").change(() => {
        if ($("#staffType").val() == 2 && userType!=0) {
            $("#staffType").after("<select style='float:clear' id='grade'\
            data-placeholder='Subject(s)'\
            name='subjects[]' \
            multiple class='select-subjects'><select>");
            $("#grade").html(subjectsGradeOptions()).select2()
        }

        if ($("#staffType").val() == 1) {
            $("#grade").remove();
            $(".select2-container").remove();
        }
        return false;
    })
    //Submit the add student form
    $("#addStaff").click(() => {
        event.preventDefault();
        var name = $("#staffName").val();
        var gender = $("#gender").val();
        var type = $("#staffType").val();
        var email = $("#staffEmail").val();
        var tel = $("#staffTel").val();
        var grade = $("#grade").select2('val')
        var password = $("#password").val();

        //var DOB = $("#studentDOB").val();
        var validName, valideEmail, validType, validPassword;

        if (name == "") {
            alert("Please enter a name");
        }
        else {
            validName = true;
        }

        if (email == "" || emailIsValid(email) !== true) {
            alert("Please enter an email");
        }
        else {
            valideEmail = true;
        }

        if (type == "") {
            alert("Please enter a type");
        }
        else {
            validType = true;
        }

        if (password == "") {
            alert("Please enter a password");
        }
        else {
            validPassword = true;
        }

        if ($("#staffType").val() == 2 && userType!=0) {
            //Check that a grade(s) was provided for the teacher to teach
            if ($("#grade").select2('val') == null) {
                alert("Please enter a grade");
            }
            else {
                validGrade = true;
            }
        }

        if (validName == true && validType == true && valideEmail == true && validPassword == true) {
            var info = new FormData();
            info.append('name', name);
            info.append('gender', gender);
            info.append('type', type);
            info.append('email', email);
            info.append('tel', tel);
            info.append('password', password);

            info.append('school', schoolId);
            info.append('start', start);
            info.append('end', end);


            if ($("#staffType").val() == 2 && userType!=0) {
                info.append('grade', grade);
            }
            $("#addStaff").attr('disabled', true);

            createStaff(info);
        }

        return false;
    })

    return false;
}

function createStaff(data) {
    var url = app_url+"modules/dean/create/staff.php";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                fetchTeachers().then(function () {
                    $(".modal").remove();
                    alert("Staff successfully inserted")
                    makeTeachersTable();
                })
            }
            else {
                $("#addStaff").attr('disabled', false);

                alert("Failed to create staff")
            }
        }

    });
}