function makeTeachersTable(array, container) {
    var teacherTableTemplate = "<button id='addTeacherButton'>Add</button>";
    teacherTableTemplate += "<select id='searchTeacherBox'></select>"
    teacherTableTemplate += "<button id='downloadStaffList'>Download</button>";
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
    for (let i = 0; i < array.length; i++) {
        teacherTableTemplate += "<tr>";
        number = i + 1;
        teacherTableTemplate += "<td>" + number + "</td>";
        teacherTableTemplate += "<td>" + array[i]['name'] + "</td>";
        teacherTableTemplate += "<td>" + array[i]['email'] + "</td>";
        teacherTableTemplate += "<td>" + genders[array[i]['gender']] + "</td>";
        teacherTableTemplate += "<td>" + array[i]['tel'] + "</td>";
        if (array[i]['type'] == 1) {
            jobTitle = "Dean";
        }
        if (array[i]['type'] == 2) {
            jobTitle = "Teacher";
        }
        teacherTableTemplate += "<td>" + staffTypes[array[i]['type']] + "</td>";

        //Staff edit button
        teacherTableTemplate += "<td><button onclick=getTeacherInfo(" + i + ")>Edit</button></td>"

        //staff delete button
        teacherTableTemplate += "<td><button onclick=deleteStaff(" + array[i]['id'] + ")>Delete</button></td>"

        teacherTableTemplate += "</tr>";
    }
    teacherTableTemplate += "</table></div>"
    $('#' + container).html("");
    $('#' + container).append(teacherTableTemplate);
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
        window.open("modules/list.php?staff=" + schoolId);

        return false;
    })


    return false;
}