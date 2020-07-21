$('document').ready(function () {
    fetchSchoolInfo();

    fetchPeriods().then(function () {

        stdResultsForm();

    });

})

$("#stdResults").click(function () {
    $("#desk").html("");

    stdResultsForm();
})


$("#stdReports").click(function () {
    stdReportForm();
    $("#desk").html("");

})


$("#stdDisciplineTab").click(function () {
    $("#desk").html("");

    var form = "<form>\
    <center><h4>Discipline</h4></center>\
    <h5>Period</h5>\
    <select id=periods></select><br>";

    $("#container").html(form);
    $("#periods").html(periodOptions())

    $("#periods").select2();
    //wait for change
    $("#periods").change(function () {
        var periodPosition = $("#periods").val();
        var period = periods[periodPosition][0]['id'];
        var Pstart = periods[periodPosition][0]['start'];
        var Pend = periods[periodPosition][0]['end'];

        currentPeriodId = period;
        start = Pstart
        end = Pend;

        fetchStudentDiscipline(userId);


    })
})

function periodOptions() {
    var options = '<option value=null></option>';
    for (var i = 0; i < periods.length; i++) {
        options += "<option value=" + i + ">" + periods[i][0]['name'] + "</option>"
    }
    return options;
}

function StdMarksTable(data) {

    $("#desk").html("");

    var html = '';


    for (var i = 0; i < data.length; i++) {


        var table = "<table><tr><th>Assessment</th><th>Mark</th></tr>";

        for (var j = 0; j < data[i]['test'].length; j++) {
            table += "<tr>"
            table += "<td>" + data[i]['test'][j]['name'] + "</td>"
            table += "<td>" + data[i]['test'][j]['marks'] + "</td>"

            table + "</tr>";


        }
        table += "</table><br>";

        html += "<h4>" + data[i]['name'] + "</h4>";

        html += table;


    }

    $("#desk").html(html);
}

function stdResultsForm() {
    var form = "<form>\
                <h4>Period</h4>\
                <select id=periods></select><br>";

    $("#container").html(form);
    $("#periods").html(periodOptions())
    $("#periods").select2();


    //wait for change
    $("#periods").change(function () {
        var periodPosition = $("#periods").val();
        var period = periods[periodPosition][0]['id'];

        fetchStdMarks(period);
    })
}


function stdReportForm() {
    $("#container").html("<form>\
    <h4>Period</h4>\
    <select id=period></select><br>\
    <h4>Type</h4>\
    <select name='type' id='type'>\
    <option></option>\
    <option value='1'>Monthly</option>\
    <option value='2'>Periodic</option>\
    <option value='3'>Annual</option>\
    </select><br>\
    <button class='new' id='generate'>Generate</button>\
</form>");

    $("#period").html(periodOptions())

    $("#period").select2();

    $("#type").change(function () {

        var type = $("#type").val();
        //Monthly reports
        if (type == 1) {

            $("#periods").remove()

            $("#type").after("<select name='month' id='month'></select>")
            //createMonthOptions("month")
            $("#month").html(createMonthOptions());
        }

        //periodic reports
        if (type == 2) {


            $("#month").remove();
        }

        //Annual reports
        if (type == 3) {
            $("#month").remove()
            $("#periods").remove()

        }

        return false;
    })

    $("#generate").click(function () {
        event.preventDefault();

        var periodPosition = $("#period").val();
        var period_id = periods[periodPosition][0]['id']
        var name = periods[periodPosition][0]['name']

        var start = periods[periodPosition][0]['start']
        var end = periods[periodPosition][0]['end']
        var grade = periods[periodPosition][0]['grade']


        console.log(start)
        var type = $("#type").val()
        var month;

        //monthly
        if (type == 1) {
            month = $("#month").val()
        }

        //periodic
        if (type == 2) {
            period = $("#periods").val()
        }

        //monthly report ajax
        if (type == 1) {
            if (reportsFolder == "") {
                var url = app_url + "modules/pdf/general/reports/monthly.php";

            }
            else {
                var url = app_url + "modules/pdf/" + reportsFolder + "/reports/monthly.php"
            }

            url += "?school=" + schoolId;
            url += "&period=" + period_id;
            url += "&month=" + (parseInt(month, 10) + 1);
            url += "&start=" + start;
            url += "&end=" + end;
            url += "&grade=" + grade;

            url += "&student=" + userId;
            window.open(url)
        }

        //periodic report

        if (type == 2) {
            if (reportsFolder == "") {
                var url = app_url + "modules/pdf/general/reports/periodic.php";

            }
            else {
                var url = app_url + "modules/pdf/" + reportsFolder + "/reports/periodic.php"
            }

            url += "?period=" + period_id;
            url += "&name=" + name;

            url += "&school=" + schoolId;

            url += "&start=" + start;
            url += "&end=" + end;
            url += "&grade=" + grade;

            url += "&student=" + userId;

            window.open(url)
        }

        if (type == 3) {
            //add 1 coz months are stored in an array
            if (reportsFolder == "") {
                var url = app_url + "modules/pdf/general/reports/annual.php";

            }
            else {
                var url = app_url + "modules/pdf/" + reportsFolder + "/reports/annual.php"
            }
            url += "?grade=" + grade;
            url += "&school=" + schoolId;

            url += "&start=" + start;
            url += "&end=" + end;
            url += "&student=" + userId;

            window.open(url)
        }
    })
}


function discipline() {

    disciplineMarks = 100;

    for (var i = 0; i < studentDisciplineInfo[0].length; i++) {
        disciplineMarks += parseInt(studentDisciplineInfo[0][i]['marks'])


    }
    $("#desk").html("");

    $("#desk").append("<br><div style='display:flex;font-weight:bold;'><h6>Discipline: </h6><div id='balance'>" + disciplineMarks + "</div></div><br>")

    $("#desk").append("<button id='disciplineMarksTab' class=''>Marks</button>\
                                <button id='commentTab' class=''>Comments</button>")

    $("#desk").append("<div id='disciplineDesk'></div>")

    disciplineTable();



    $("#disciplineMarksTab").click(function () {
        disciplineTable();
    })

    $("#commentTab").click(function () {
        commentTable();
    })

    function disciplineTable() {
        var table = "<table><tr><th>Date</th><th>Type</th><th>Marks</th><th>Educator</th><th>Period</th><th>Year</th></tr>";

        for (var i = 0; i < studentDisciplineInfo[0].length; i++) {

            disciplineRecord = studentDisciplineInfo[0][i];


            table += "<td>" + disciplineRecord['date'] + "</td>";

            var color;
            if (disciplineRecord['type'] == 1) {
                color = 'new';
            }
            else {
                color = 'delete';
            }

            table += "<td><button class=" + color + ">" + disciplineTypes[disciplineRecord['type']] + "</button></td>";
            table += "<td>" + disciplineRecord['marks'] + "</td>";
            table += "<td>" + disciplineRecord['educator'] + "</td>";
            table += "<td>" + disciplineRecord['start'] + "-" + disciplineRecord['end'] + "</td>";
            table += "<td>" + disciplineRecord['period'] + "</td>";

            table += "</tr>";

        }
        table += "</table>";

        $("#disciplineDesk").html(table);

    }

    function commentTable() {
        $("#disciplineDesk").html('')
        var table = "<table><tr><th>Date</th><th>Comment</th><th>Educator</th><th>Period</th><th>Year</th></tr>";

        for (var i = 0; i < studentDisciplineInfo[1].length; i++) {

            disciplineRecord = studentDisciplineInfo[1][i];


            table += "<td>" + disciplineRecord['date'] + "</td>";
            table += "<td>" + disciplineRecord['comment'] + "</td>";
            table += "<td>" + disciplineRecord['educator'] + "</td>";
            table += "<td>" + disciplineRecord['start'] + "-" + disciplineRecord['end'] + "</td>";
            table += "<td>" + disciplineRecord['period'] + "</td>";
            table += "</tr>";





        }
        table += "</table>";

        $("#disciplineDesk").html(table);

    }


}