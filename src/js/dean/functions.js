//generate options for months
function createMonthOptions(idOfElement) {
    for (var i = 0; i < months.length; i++) {
        $('#' + idOfElement).select2({
            data: [
                { id: i, text: months[i] }
            ]
        });
    }
    return false;
}

//generate options for academic terms | periods
function generateTermOptions(idOfElement) {
    for (var i = 0; i < periods.length; i++) {
        var position = periods[i]['periods'];
        for (var h = 0; h < position.length; h++) {
            var periodName = position[h]['name']
            infoArray = i + ',' + h;
            $('#' + idOfElement).select2({
                data: [
                    /*
                     * Text format
                     *
                     * Year position
                     * Period position
                     */
                    //{ id: position[h]['id'], text: periods[i]['year'] + " " + periodName }
                    { id: infoArray, text: periods[i]['year'] + " " + periodName }
                ]
            })
        }
    }

    $('#' + idOfElement).val(infoArray).trigger('change');
}

//function to set the current term to the last term in array
function setCurrentPeriod() {
    //variable which is going to contain the index of the last term while looping through the terms array
    var positionInArray;

    for (var h = 0; h < periods.length; h++) {
        currentYearId = periods[h]['id'];
        currentYear = periods[h]['year'];
        positionInArray = h;
    }

    var arrayOfPeriods = periods[positionInArray]['periods'];

    for (var i = 0; i < arrayOfPeriods.length; i++) {
        currentPeriodId = arrayOfPeriods[i]['id'];
        currentPeriod = arrayOfPeriods[i]['name'];

    }
    return false;
}

//function used to reset the dashboard to initial look
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

function subjects_gradeOptions(idOfElement) {
    //var array = "";
    for (var i = 0; i < subjects.length; i++) {
        //var position=subjects[i]['stream'];
        var stream = "";//streams[i][position];
        for (var h = 0; h < streams.length; h++) {
            if (streams[h]['id'] == subjects[i]['stream']) {
                stream = streams[h]['grade'] + " " + streams[h]['stream']
                break;
            }
        }

        $('#' + idOfElement).select2({
            data: [
                { id: subjects[i]['id'], text: subjects[i]['name'] + " " + stream }
            ]
        });
    }
    return false;
}

function createMonthOptions(idOfElement) {
    for (var i = 0; i < months.length; i++) {
        $('#' + idOfElement).select2({
            data: [
                { id: i, text: months[i] }
            ]
        });
    }
    return false;
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

//Listen for change in term select box
function changeTermListener() {
    $('#termOptions').change(function () {
        var selectedTermValue = $('#termOptions').val()
        //get first value == year's index in periods array
        var selectedTermYear = selectedTermValue.split(',')[0];
        //get second value == period's index in the periods array
        var selectedTermArrayPosition = selectedTermValue.split(',')[1];
        //get the periods array of a the selected year using the year's index and the index of the period array
        var selectedPeriodArray = periods[selectedTermYear]['periods'][selectedTermArrayPosition]
        var selectedTermId = selectedPeriodArray['id'];
        var selectedTermName = selectedPeriodArray['name'];

        if (selectedTermId !== currentPeriodId) {
            currentPeriodId = selectedTermId;
            currentPeriod = selectedTermName;

            fetchTests();
            marks();
            alert("Term changed successfully")
        }

        return false;
    })
    return false;
}

//generate options for grades | streams
function streamsOptions() {
    var optionsTemplate = "";
    for (var i = 0; i < streams.length; i++) {
        optionsTemplate += "<option value='" + streams[i]['id'] + "'>Grade " + streams[i]['grade'] + ' ' + streams[i]['stream'] + "</option>";
    }
    return optionsTemplate;
}