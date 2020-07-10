function discipline() {

    disciplineMarks = 100;

    for (var i = 0; i < studentDisciplineInfo[0].length; i++) {
        disciplineMarks += parseInt(studentDisciplineInfo[0][i]['marks'])


    }



    $("#studentDesk").html("<br><div style='display:flex;font-weight:bold;'><h6>Discipline: </h6><div id='balance'>" + disciplineMarks + "</div></div><br>\
                                <button id='deductForm' class='delete'>Deduct</button>\
                                <button id='awardForm'>Award</button>\
                                <button id='commentForm'>Comment</button>")

    $("#studentDesk").append("<br><button id='disciplineMarksTab' class=''>Marks</button>\
                                <button id='commentTab' class=''>Comments</button>")

    $("#studentDesk").append("<div id='disciplineDesk'></div>")

    disciplineTable();

    $("#deductForm").click(function () {
        deduct();
    })

    $("#awardForm").click(function () {
        award();
    })

    $("#commentForm").click(function () {
        comment();
    })

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
            if(disciplineRecord['type']==1){
                color='new';
            }
            else{
                color='delete';
            }

            table += "<td><button class="+color+">" +disciplineTypes[disciplineRecord['type']] + "</button></td>";
            table += "<td>" + disciplineRecord['marks'] + "</td>";
            table += "<td>" + disciplineRecord['educator'] + "</td>";
            table += "<td>" + disciplineRecord['start']+"-"+ disciplineRecord['end']+ "</td>";
            table += "<td>" + disciplineRecord['period'] + "</td>";

            table += "</tr>";

        }
        table += "</table>";

        $("#disciplineDesk").html(table);

    }

    function commentTable() {

        var table = "<table><tr><th>Date</th><th>Comment</th><th>Educator</th><th>Period</th><th>Year</th></tr>";

        for (var i = 0; i < studentDisciplineInfo[1].length; i++) {

            disciplineRecord = studentDisciplineInfo[1][i];


            table += "<td>" + disciplineRecord['date'] + "</td>";
            table += "<td>" + disciplineRecord['comment'] + "</td>";
            table += "<td>" + disciplineRecord['educator'] + "</td>";
            table += "<td>" + disciplineRecord['start']+"-"+ disciplineRecord['end']+ "</td>";
            table += "<td>" + disciplineRecord['period'] + "</td>";
            table += "</tr>";





        }
        table += "</table>";

        $("#disciplineDesk").html(table);

    }

    function deduct() {
        var form = "<div class='modal'><form>\
                        <h4>Deduct</h4>\
                        <input type='number' id='deduction'><br>\
                        <h4>Offense</h4>\
                        <input type='text' id='offense'><br>\
                        <button class='delete' id='cancel'>Cancel</button>\
                        <button class='new' id='deduct'>Deduct</button>\
                        </form></div>";

        $('body').append(form);

        $("#cancel").click(function () {
            event.preventDefault();

            $('.modal').remove();

        })

        $("#deduct").click(function () {
            event.preventDefault();

            var deduction = $("#deduction").val();
            var offense = $("#offense").val();

            if (deduction == '') {
                alert("Enter marks to deduct!")
            }

            if (offense == '') {
                alert("Enter offense done!");
            }

            if (deduction !== null && offense !== null) {
                //make deduction negative
                deduction *= -1;
                deductMarks(studentDisciplineId, 0, deduction, offense, userId)
            }


        })
    }

    function award() {

        var form = "<div class='modal'><form>\
                        <h4>Award</h4>\
                        <input type='number' id='award'><br>\
                        <h4>Reason</h4>\
                        <input type='text' id='reason'><br>\
                        <button class='delete' id='cancel'>Cancel</button>\
                        <button class='new' id='awardButton'>Award</button>\
                        </form></div>";

        $('body').append(form);

        $("#cancel").click(function () {
            event.preventDefault();

            $('.modal').remove();

            return false;
        })

        $("#awardButton").click(function () {
            event.preventDefault();
            var award = $("#award").val();
            var reason = $("#reason").val();

            if (award == '') {
                alert("Enter marks to award!")
            }

            if (reason == '') {
                alert("Enter reason!");
            }

            if (award !== "" && reason !== "") {
                awardMarks(studentDisciplineId, 1, award, reason, userId)
            }

        })

    }

    function comment() {
        var form = "<div class='modal'><form>\
                        <h4>Comment</h4>\
                        <textarea id='comment'></textarea><br>\
                        <button class='delete' id='cancel'>Cancel</button>\
                        <button class='new' id='commentButton'>Comment</button>\
                        </form></div>";

        $('body').append(form);

        $("#cancel").click(function () {
            event.preventDefault();

            $('.modal').remove();

        })

        $("#commentButton").click(function () {
            event.preventDefault();

            var comment = $("#comment").val();

            if (comment == '') {
                alert("Enter marks to deduct!")
            }


            if (comment !== null) {
                commentStudent(studentDisciplineId, comment, userId)
            }


        })
    }
}

function deductMarks(id, type, marks, offense, educator) {
    var url = app_url + "modules/dean/create/discipline.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            student: id,
            type: type,
            marks: marks,
            comment: offense,
            educator: educator,
            period: currentPeriodId,
            start: start,
            end: end
        },
        success: function (response) {
            if (response == 'ok') {
                alert("Marks deducted!");
                deleteModal();
                fetchStudentDiscipline(studentDisciplineId);

            } else {
                alert("Failed to deduct marks!");
            }
        }
    })
}

function awardMarks(id, type,award,reason, educator) {
    var url = app_url + "modules/dean/create/discipline.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            student: id,
            type: type,
            marks: award,
            comment: reason,
            educator: educator,
            period: currentPeriodId,
            start: start,
            end: end
        },
        success: function (response) {
            if (response == 'ok') {
                alert("Marks awarded!");
                deleteModal();
                fetchStudentDiscipline(studentDisciplineId);

            } else {
                alert("Failed to award marks!");
            }
        }
    })
}

function commentStudent(id, comment, educator) {
    var url = app_url + "modules/dean/create/comment.php";

    $.ajax({
        url: url,
        method: "post",
        data: {
            student: id,
            comment: comment,
            educator: educator,
            period: currentPeriodId,
            start: start,
            end: end
        },
        success: function (response) {
            if (response == 'ok') {
                alert("Comment Saved!");
                deleteModal();
                fetchStudentDiscipline(studentDisciplineId);

            } else {
                alert("Failed to save comment!");
            }
        }
    })
}