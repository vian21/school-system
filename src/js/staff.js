function makeTeachersTable(array) {
    let teacherTableTemplate = "<button id='addTeacherButton'>Add</button>";
    teacherTableTemplate += "<select id='searchTeacherBox'></select>"
    teacherTableTemplate += "<div id='teacherView'>"
    teacherTableTemplate += "<table id='teachersTable'>\
    <tr><th>#</th><th>Name</th>\
    <th>Email</th>\
    <th>Job</th>\
    <th></th>\
    <th></th>\
    </tr>";
    let number = 0;
    let jobTitle;
    for (let i = 0; i < array.length; i++) {
        teacherTableTemplate += "<tr>";
        number = i + 1;
        teacherTableTemplate += "<td>" + number + "</td>";
        teacherTableTemplate += "<td>" + array[i]['name'] + "</td>";
        teacherTableTemplate += "<td>" + array[i]['email'] + "</td>";
        if (array[i]['type'] == 1) {
            jobTitle = "Dean";
        }
        if (array[i]['type'] == 2) {
            jobTitle = "Teacher";
        }
        teacherTableTemplate += "<td>" + jobTitle + "</td>";
 
        //Staff edit button
        teacherTableTemplate+="<td><button onclick=getTeacherInfo("+i+")>Edit</button></td>"

        //staff delete button
        teacherTableTemplate+="<td><button onclick=deleteItem(1,"+array[i]['id']+")>Delete</button></td>"

        teacherTableTemplate += "</tr>";
    }
    teacherTableTemplate += "</table></div>"
    $("#two").html("");
    $("#two").append(teacherTableTemplate);
    addTeachersTosearchBox();

    //add a listener for click on add button
    $("#addTeacherButton").click(() => { showStaffForm() });

    //let position=$("#searchTeacherBox").select2('val');

    $("#searchTeacherBox").change(() => { 
        let position=$("#searchTeacherBox").select2('val');
        //console.log(position)
        getTeacherInfo(position) 
    })

    return false;
}

function addTeacherChangeListeners(id) {
    $('#teacherName').change(() => {
        let newName = $('#teacherName').val();
        //console.log(newName)
        save(1, id, 'name', newName);

    });

    $('#teacherEmail').change(() => {
        let newEmail = $('#teacherEmail').val();
        save(1, id, 'email', newEmail);
        //console.log(newEmail)
    });

    $('#teacherTel').change(() => {
        let newTel = $('#teacherTel').val();
        save(1, id, 'tel', newTel);
        //console.log(newTel)
    });
}

function addTeachersTosearchBox() {
    //console.log(1)
    $("#searchTeacherBox").html('')
    $("#searchTeacherBox").append("<option></option>");
    //$("#searchTeacherBox").html('')

    for (let i = 0; i < teachersArray.length; i++) {
        //console.log(i)
        $("#searchTeacherBox").select2({
            data: [
                { id: i, text: teachersArray[i]['name'] }
            ]
        });
    }
    
    $("#searchTeacherBox").select2({
        width: 'resolve'
    });
    return false;
}

function getTeacherInfo(position) {
    //console.log(position)

    //The position at which the teacher is located
   // var position = $("#searchTeacherBox").select2('val');
    var teacherId = teachersArray[position]['id'];
    teacherInfoTemplate = "<br><img src='src/img/";
    let img;
    if (teachersArray[position]['image'] == "") {
        img = "user.png";
    }
    else {
        img = teachersArray[position]['image'];
    }
    teacherInfoTemplate += img + "'><br>";
    teacherInfoTemplate += '<span>Name : </span><input id="teacherName" value="' + teachersArray[position]['name'] + '"><br>';
    teacherInfoTemplate += "<span>Email : </span><input id='teacherEmail' value=" + teachersArray[position]['email'] + "><br>";
    teacherInfoTemplate += "<span>Tel : </span><input id='teacherTel' value=" + teachersArray[position]['tel'] + "><br>";

            //staff delete button
            teacherInfoTemplate+="<td><button onclick=deleteItem(1,"+teachersArray[position]['id']+")>Delete</button></td>"
    teacherInfoTemplate += "<div id='msgBoard'></div>"

    $("#teacherView").html(teacherInfoTemplate)
    addTeacherChangeListeners(teacherId);
    //return false;
}

function showStaffForm() {
    var form = "<div id='addTeacherModal' class='modal'><form id='addStaffForm'>\
    <h4>Name</h4><input type='text' name='name' id='staffName' required>\
    <h4>Email</h4><input type='email' name='email' id='staffEmail'>\
    <h4>Telephone</h4>\
    <input type='number' name='tel' id='staffTel'>\
    <h4>Type</h4>\
    <select id='staffType'>\
    <option value='1'>Dean</option>\
    <option value='2'>Teacher</option></select><br>\
    <button id='cancelStaffForm'>Cancel</button>\
    <button type='submit' id='addStaff'>Add</button></form></div>";
    $('body').append(form);
    //These are here becuse they work only when the form is in the DOM but wheb when the oage loads it is not here, that is why it does not work any where else
    //Make the teacher form disappear when clicked on cancel button
    $("#cancelStaffForm").click(() => {
        event.preventDefault();
        $("#addTeacherModal").remove();
        return false;
    })
    $("#staffType").change(() => {
        if ($("#staffType").val() == 2) {
            $("#staffType").after("<select style='float:clear' id='grade'\
            data-placeholder='Subject(s)'\
            name='subjects[]' \
            multiple class='select-subjects'><select>");
            //$(".multipleGrades").select2();
            /*$(".multipleGrades").change(() => {
                console.log($(".multipleGrades").select2('data'));
            })*/
            //$("#grade").select2({
            //data: [
            //{ id: '', text: ' ' },
            subjects_gradeOptions('grade')//]
            // });
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
        var type = $("#staffType").val();
        var email = $("#staffEmail").val();
        var tel = $("#staffTel").val();
        var grade = $("#grade").select2('val')//values()//data('option-array-index');
        console.log(grade);
        //var DOB = $("#studentDOB").val();
        var validName, valideEmail, validType, validGrade;
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
        if ($("#staffType").val() == 2) {
            //Check that a grade(s) was provided for the teacher to teach
            if ($("#grade").select2('val') == null) {
                alert("Please enter a grade");
            }
            else {
                validGrade = true;
            }
        }
        if (validName == true && validType == true && valideEmail == true) {
            var info = new FormData();
            info.append('name', name);
            info.append('type', type);
            info.append('email', email);
            info.append('tel', tel);
            if ($("#staffType").val() == 2) {
                info.append('grade', grade);
            }
            //info.append('DOB', DOB);
            //If adding teacher, a grade must be provided
            //If staff is teacher handler
            if ($("#staffType").val() == 2) {
                add(1, info);
            }
            //If staff is dean handler
            if ($("#staffType").val() == 1) {
                add(1, info);
            }
            //console.log(info)
        }
        /*else {
            $("#addStudent").unbind('click');
        }*/
        return false;
    })
    return false;
}
