function makeTeachersTable() {
    var teacherTableTemplate = "<button class='new' id='addTeacherButton'>Add</button>";
    teacherTableTemplate += "<select id='searchTeacherBox'></select>"
    teacherTableTemplate += "<button class='new' id='downloadStaffList'>Download</button>";
    teacherTableTemplate += "<div id='teacherView'>"
    teacherTableTemplate += "<table id='teachersTable'>\
                                <tr><th>#</th><th>Name</th>\
                                <th>Email</th>\
                                <th>Gender</th>\
                                <th>Number</th>\
                                <th>Title</th>\
                                <th></th>\
                                <th></th>\
                                </tr>";
    var number = 0;
    var jobTitle;
    for (let i = 0; i < teachersArray.length; i++) {
        teacherTableTemplate += "<tr>";
        number = i + 1;
        teacherTableTemplate += "<td>" + number + "</td>";
        teacherTableTemplate += "<td>" + teachersArray[i]['name'] + "</td>";
        teacherTableTemplate += "<td>" + teachersArray[i]['email'] + "</td>";
        teacherTableTemplate += "<td>" + genders[teachersArray[i]['gender']] + "</td>";
        teacherTableTemplate += "<td>" + teachersArray[i]['tel'] + "</td>";
        if (teachersArray[i]['type'] == 1) {
            jobTitle = "Dean";
        }
        if (teachersArray[i]['type'] == 2) {
            jobTitle = "Teacher";
        }
        teacherTableTemplate += "<td>" + staffTypes[teachersArray[i]['type']] + "</td>";

        //Staff edit button
        teacherTableTemplate += "<td><button class='new' onclick=getTeacherInfo(" + i + ")>Edit</button></td>"

        //staff delete button
        teacherTableTemplate += "<td><button class='delete' onclick=deleteStaff(" + teachersArray[i]['id'] + ")>Delete</button></td>"

        teacherTableTemplate += "</tr>";
    }
    teacherTableTemplate += "</table></div>"
    $('#container').html("");
    $('#container').append(teacherTableTemplate);
    addTeachersTosearchBox();

    //add a listener for click on add button
    $("#addTeacherButton").click(() => { showStaffForm() });

    //let position=$("#searchTeacherBox").select2('val');

    $("#searchTeacherBox").change(() => {
        var position = $("#searchTeacherBox").select2('val');
        //console.log(position)
        getTeacherInfo(position)
    })

    //Open new tab with a pdf of staff list
    $("#downloadStaffList").click(function () {
        window.open("modules/dean/lists/staff.php?staff=" + schoolId);

        return false;
    })


    return false;
}


function getTeacherInfo(position) {
    //console.log(position)

    //The position at which the teacher is located
    // var position = $("#searchTeacherBox").select2('val');
    var teacherId = teachersArray[position]['id'];
    $('input').attr("autocomplete", 'off');

    teacherInfoTemplate = "<br><img src='src/img/";
    var img;
    if (teachersArray[position]['image'] == "") {
        img = "user.png";
    }
    else {
        img = teachersArray[position]['image'];
    }
    teacherInfoTemplate += img + "'><br>";
    teacherInfoTemplate += '<span>Name : </span><input id="teacherName" value="' + teachersArray[position]['name'] + '" " autocomplete="off"><br>';

    teacherInfoTemplate += "Gender: <select id='staffGender'>";
    teacherInfoTemplate += "<option value='0'>Male</option>";
    teacherInfoTemplate += "<option value='1'>Female</option>";
    teacherInfoTemplate += "</select><br>";

    teacherInfoTemplate += "<span>Email : </span><input id='teacherEmail' type='email' value=" + teachersArray[position]['email'] + " autocomplete='off'><br>";
    teacherInfoTemplate += "<span>Tel : </span><input id='teacherTel' type='tel' value='" + teachersArray[position]['tel'] + "' autocomplete='new-password'><br>";

    teacherInfoTemplate += "Job : <select id='staffTitle'>";
    teacherInfoTemplate += staffTitlesOptions();
    teacherInfoTemplate += "</select><br>";
    teacherInfoTemplate += "<b>Change password: </b><input type=password id='newPassword' autocomplete='new-password'>"
    teacherInfoTemplate += "<br><div id='msgBoard'></div>"

    if (teachersArray[position]['type'] == 1) {

        teacherInfoTemplate += `
        <h4>Subjects taught</h4>\
        <button class='new' onclick=addClass(`+ teachersArray[position]['id'] + `)>Add</button>`
        teacherInfoTemplate += `<table>\
        <tr><th>#</th>\
        <th>subject</th>\
        <th></th>\
        </tr>`
        var template = "";
        for (var i = 0; i < teachersArray[position]['subjects'].length; i++) {
            var table = "";
            var index = teachersArray[position]['subjects'][i];
            var number = i + 1;
            table += "<tr>";
            table += "<td>" + number + "</td>"
            table += "<td>" + index['subject'] + ' ' + index['stream']['grade'] + index['stream']['stream'] + "</td>";
            table += "<td><button class='delete' onclick=removeClass(" + teachersArray[position]['id'] + ',' + index['id'] + ")>Delete</button></td>"
            table += "<tr>";
            template += table;
        }
        teacherInfoTemplate += template + "</table>";
    }

    //staff delete button
    teacherInfoTemplate += "<td><button class='delete' onclick=deleteStaff(" + teachersArray[position]['id'] + ")>Delete</button></td>"

    $("#teacherView").html(teacherInfoTemplate)

    //Make the gender selected
    $("#staffGender").val(teachersArray[position]['gender']).trigger('change');

    //Make title selected
    $("#staffTitle").val(teachersArray[position]['type']).trigger('change');

    addTeacherChangeListeners(teacherId);
    //return false;
}


function addTeacherChangeListeners(id) {
    $('#teacherName').change(() => {
        var newName = $('#teacherName').val();
        //console.log(newName)
        //save(1, id, 'name', newName);
        updateStaffName(id, newName);

    });

    $('#staffGender').change(() => {
        var newGender = $('#staffGender').val();
        //console.log(newName)
        // save(1, id, 'gender', newGender);
        updateStaffGender(id, newGender)

    });

    $('#teacherEmail').change(() => {
        var newEmail = $('#teacherEmail').val();
        //save(1, id, 'email', newEmail);
        //console.log(newEmail)
        updateStaffEmail(id, newEmail)
    });

    $('#teacherTel').change(() => {
        var newTel = $('#teacherTel').val();
        //save(1, id, 'tel', newTel);
        //console.log(newTel)
        updateStaffTel(id, newTel);
    });

    $('#staffTitle').change(() => {
        var newTitle = $('#staffTitle').val();
        //console.log(newName)
        //save(1, id, 'title', newTitle);
        updateStaffJob(id, newTitle);

    });

    $('#newPassword').change(() => {
        var newPassword = $('#newPassword').val();
        //console.log(newName)
        //save(1, id, 'title', newTitle);
        updateStaffPassword(id, newPassword);

    });
}