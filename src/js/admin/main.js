$(document).ready(function () {
    var schools;
    fetchSchools().then(function(){
        generateSchoolsTable();
    });
})

var typeOptions;

for (var i = 0; i < schoolTypes.length; i++) {
    typeOptions += "<option value=" + i + ">" + schoolTypes[i] + "</option>";
}

$("#create").click(function () {
    var form = `<div id='schoolModal' class='modal'>
            <form>
            <h4>Name</h4>
            <input type='text' id='schoolName'><br><br>`
    form += "<select id='schoolType'>" + typeOptions + "</select><br><br>"
    form += `
        <button class='delete' type='button' id='cancel'>cancel</button>
        <button class='new' type='submit' id='createSchool'>create</button>
        </form></div>`

    $('body').append(form);


    $("#cancel").click(function () {
        event.preventDefault();

        $('.modal').remove();

        return false;
    })

    $('#createSchool').click(function () {
        event.preventDefault();
        var name=$("#schoolName").val();
        var type=$("#schoolType").val();
        if(name==""){
            alert("Please enter a name");
        }else{
            createSchool(name,type);
        }
    })
})
function generateSchoolsTable() {
    var table = "<table><tr><th>#</th><th>Name</th><th>Last Paid</th><th>Time</th><th>Due</th><th></th><th></th></tr>"
    for (var i = 0; i < schools.length; i++) {
        var number = i + 1;
        table += "<tr>";
        table += "<td>" + number + "</td>"
        table += "<td>" + schools[i]['name'] + "</td>";
        table += "<td>" + schools[i]['last_paid'] + "</td>";
        table += "<td>" + schools[i]['time'] + "</td>";
        table += "<td>" + schools[i]['end'] + "</td>";
        table += "<td><button onclick=manage(" + schools[i]['id'] + ") id='manage'>Manage</button></td>";
        table += "<td><button onclick=deleteSchool(" + schools[i]['id'] + ") id='manage' class='delete'>Delete</button></td>";
        table += "</tr>";

    }
    table += "</table>";
    $("#schools").html(table);
}

function manage(id) {
    var url = "manage.php?school=" + id;
    window.open(url, '_self');
}