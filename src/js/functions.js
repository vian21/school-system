
function generateTermOptions() {
    //id of the select box for terms
    var element = "#termOptions"
    //variable to contain the index of the last term
    var lastTermIndex;
    $(element).html('');
    for (var i = 0; i < periods.length; i++) {

        $(element).append("<option value=" + i + ">" + periods[i]['year'] + ' ' + periods[i]['period_name'] + "</option>")
        lastTermIndex = i;
    }


    $(element).val(lastTermIndex).trigger('change');

    //listen for change
    changeTermListener();
}

//Listen for change in term select box
function changeTermListener() {
    $('#termOptions').change(function () {

        var selectedTermIndex = $('#termOptions').val()

        var selectedTermId = periods[selectedTermIndex]['id'];
        var selectedTermName = periods[selectedTermIndex]['period_name'];

        var selectedTermStart = periods[selectedTermIndex]['year'][0];
        var selectedTermEnd = periods[selectedTermIndex]['year'][1];

        if (selectedTermId !== currentPeriodId) {

            currentPeriodId = selectedTermId;
            currentPeriod = selectedTermName;

            start = selectedTermStart;
            end = selectedTermEnd;

            fetchTests().then(function () {
                //admin and dean
                if (userType == 0 || userType == 1) {

                    fetchStudents().then(function () {
                        studentsTab();
                        fetchTeachers();
                        alert("Term changed successfully")

                    })
                }

                //accountant
                if (userType == 3) {

                    fetchStudents().then(function () {
                        accounting();
                        alert("Term changed successfully")

                    })
                }

                //teacher
                if (userType == 2) {
                    fetchSubjectsTaught().then(function () {
                        marks();
                        alert("Term changed successfully")


                    })
                }
            })
        }

        return false;
    })
    return false;
}
//function used to reset the dashboard to its initial look
function dashboard() {
    $("#desk").html("<!-- Student start -->\
    <div id='container'></div>");

    studentsTab();
}

function isJSON(something) {
    if (typeof something != 'string')
        something = JSON.stringify(something);

    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
}

function emailIsValid(email) {
    var regex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return regex.test(email);
}



function subjectsGradeOptions() {
    var options;

    for (var i = 0; i < subjects.length; i++) {
        var stream = "";//streams[i][position];
        for (var h = 0; h < streams.length; h++) {
            if (streams[h]['id'] == subjects[i]['stream']) {
                stream = streams[h]['grade'] + " " + streams[h]['stream']
                break;
            }
        }

        options += "<option value=" + subjects[i]['id'] + ">" + subjects[i]['name'] + " " + stream + "</option>"
    }

    return options;
}

function createMonthOptions() {
    var options;
    for (var i = 0; i < months.length; i++) {
        options += "<option value=" + i + ">" + months[i] + "</option>"
    }
    return options;
}

function createPeriodOptions() {

    var options;
    for (var i = 0; i < periods.length; i++) {
        options += "<option value=" + periods[i]['id'] + ">" + periods[i]['period_name'] + "</option>"
    }
    return options;
}

function deleteModal() {
    $(".modal").remove();
}

function staffTitlesOptions() {
    var options = "";
    for (var i = 0; i < staffTypes.length; i++) {
        options += "<option value=" + i + ">" + staffTypes[i] + "</option>";
        //console.log(i)
    }
    return options;
}

function streamsOptions() {
    var optionsTemplate = "";
    for (var i = 0; i < streams.length; i++) {
        optionsTemplate += "<option value='" + streams[i]['id'] + "'>Grade " + streams[i]['grade'] + ' ' + streams[i]['stream'] + "</option>";
    }
    return optionsTemplate;
}

function checkPay() {
    if (paid == false) {
        alert("Subscription Over!")
        window.open(app_url + "modules/logout.php", '_self');
    }
}