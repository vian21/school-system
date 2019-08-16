function fetchTeachers() {
    var url = "modules/fetch.php?allteachers=&school_id=" + schoolId;
    $.ajax({
        url: url,
        success: function (response) {
            teachersArray = JSON.parse(response);

            addTeachersTosearchBox();

            return false;
        }
    })
}


function addTeachersTosearchBox() {
    //console.log(1)
    $("#searchTeacherBox").html('')
    $("#searchTeacherBox").append("<option></option>");
    //$("#searchTeacherBox").html('')

    for (var i = 0; i < teachersArray.length; i++) {
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
    var img;
    if (teachersArray[position]['image'] == "") {
        img = "user.png";
    }
    else {
        img = teachersArray[position]['image'];
    }
    teacherInfoTemplate += img + "'><br>";
    teacherInfoTemplate += '<span>Name : </span><input id="teacherName" value="' + teachersArray[position]['name'] + '"><br>';

    teacherInfoTemplate += "Gender: <select id='staffGender'>";
    teacherInfoTemplate += "<option value='0'>Male</option>";
    teacherInfoTemplate += "<option value='1'>Female</option>";
    teacherInfoTemplate += "</select><br>";

    teacherInfoTemplate += "<span>Email : </span><input id='teacherEmail' value=" + teachersArray[position]['email'] + "><br>";
    teacherInfoTemplate += "<span>Tel : </span><input id='teacherTel' value=" + teachersArray[position]['tel'] + "><br>";

    teacherInfoTemplate += "Job : <select id='staffTitle'>";
    teacherInfoTemplate += staffTitlesOptions();
    teacherInfoTemplate += "</select><br>";

    //staff delete button
    teacherInfoTemplate += "<td><button onclick=deleteStaff(" + teachersArray[position]['id'] + ")>Delete</button></td>"
    teacherInfoTemplate += "<div id='msgBoard'></div>"

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
        save(1, id, 'name', newName);

    });

    $('#staffGender').change(() => {
        var newGender = $('#staffGender').val();
        //console.log(newName)
        save(1, id, 'gender', newGender);

    });

    $('#teacherEmail').change(() => {
        var newEmail = $('#teacherEmail').val();
        save(1, id, 'email', newEmail);
        //console.log(newEmail)
    });

    $('#teacherTel').change(() => {
        var newTel = $('#teacherTel').val();
        save(1, id, 'tel', newTel);
        //console.log(newTel)
    });

    $('#staffTitle').change(() => {
        var newTitle = $('#staffTitle').val();
        //console.log(newName)
        save(1, id, 'title', newTitle);

    });
}