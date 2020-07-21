
function accounting() {
    $("#container").html('<button id="students">students</button>\
    <button id="accountingReports">Reports</button>\
    <div id="accountingBar"></div>\
    <div id="accountingCont"></div>');
    accountingStudents();

    $('#students').click(function () {
        accountingStudents();

        return false
    })

    $('#accountingReports').click(function () {
        accountingReports();

        return false
    })
}
function accountingStudents() {
    $("#accountingBar").html("<select name='student' id='searchStudent'>\
    <option></option>\
  </select>\
  <button id='fee' class='new'>Fee</button><br><br>")

    addToForm();

    $("#searchStudent").change(function () {
        var position = $("#searchStudent").select2('val');
        currentStudentAccountingId = studentsArray[position]['id'];
        currentStudentAccountingPos = studentsArray[position];


        fetchTransactions(currentStudentAccountingId)

    })


    $("#fee").click(function () {
        feeForm();
    })
}

function accountingReports() {
    $("#accountingBar").html("<form>\
    <h4>Type</h4>\
    <select id='type'>\
    <option value='0'>Balance</option>\
    <option value='1'>Transaction</option>\
    </select><br>\
    <h4>Grade</h4>\
    <select id='grade'>\
    </select><br>\
    <button class='new' id='generate'>Generate</button>\
</form>");

    $("#accountingCont").html('');

    $("#grade").html('<option></option>').append(streamsOptions());

    $("#generate").click(function () {
        event.preventDefault();

        var type = $("#type").val();
        var grade = $("#grade").val();

        if (grade != null && grade != "") {
            console.log(grade)
            //Balance reports
            if (type == 0) {
                if (reportsFolder == '') {
                    var url = app_url + "modules/pdf/general/accounting/balance.php?school=" + schoolId + "&grade=" + grade;

                } else {
                    var url = app_url + "modules/pdf/" + reportsFolder + "/accounting/balance.php?school=" + schoolId + "&grade=" + grade;

                }
                window.open(url)
            }

            //transaction reports
            if (type == 1) {
                if (reportsFolder == '') {
                    var url = app_url + "modules/pdf/general/accounting/transactions.php?school=" + schoolId + "&grade=" + grade;

                }
                else {
                    var url = app_url + "modules/pdf/" + reportsFolder + "/accounting/transactions.php?school=" + schoolId + "&grade=" + grade;

                }
                window.open(url)
            }
        }
    });

}

function makeTransactionsTbl(data) {
    if (currentStudentTransactions == '') {
        var balance = 0;

        $("#accountingCont").html("<button id='new'>New</button><button id='print'>Print</button><br>")
        $("#accountingCont").append("<div style='display:flex;font-weight:bold;'>Balance: <div id='balance'>" + balance.toLocaleString() + "</div></div>")

        var table = "<table><tr><th>#</th><th>Date</th><th>Item</th><th>Amount</th><th>Type</th><th></th></tr></table>";
        $("#accountingCont").append(table)


        $("#new").click(function () {
            newTransactionForm(currentStudentAccountingId)
        })


        $("#print").click(function () {
            if (reportsFolder == '') {
                var url = app_url + "modules/pdf/general/accounting/transactions.php?id=" + currentStudentAccountingId;

            }
            else {
                var url = app_url + "modules/pdf/" + reportsFolder + "accounting/transactions.php?id=" + currentStudentAccountingId;

            }
            //url += "&year=" + currentPeriodId
            url += "&grade=" + currentStudentAccountingPos['stream']['id']
            url += "&school=" + schoolId;

            window.open(url);
        })

    } else {
        var balance = 0;
        for (var i = 0; i < data.length; i++) {
            balance += parseInt(data[i]['amount']);
        }

        $("#accountingCont").html("<button id='new'>New</button><button id='print'>Print</button><br><br>")
        $("#accountingCont").append("<div style='display:flex;font-weight:bold;'><span>Balance:</span><div id='balance'> " + balance.toLocaleString() + "</div></div></br>")

        var table = "<table><tr><th>#</th><th>Date</th><th>Item</th><th>Amount</th><th>Type</th><th></th></tr>";
        if (data !== "") {
            for (var i = 0; i < data.length; i++) {
                var number = i + 1;
                table += "<tr>";
                table += "<td>" + number + "</td>"
                table += "<td>" + data[i]['date'] + "</td>"
                table += "<td>" + data[i]['item'] + "</td>"
                table += "<td>" + parseInt(data[i]['amount']).toLocaleString() + "</td>"
                table += "<td>" + transactionType[data[i]['type']] + "</td>"
                table += "<td><button onClick= deleteTransaction(" + data[i]['id'] + ") class='delete'>Delete</button></td>"

                table += "</tr>"
            }
        }
        table += "</table>";

        $("#accountingCont").append(table)


        $("#new").click(function () {
            newTransactionForm(data[0]['student_id'])
        })


        $("#print").click(function () {
            if (reportsFolder == '') {
                var url = app_url + "modules/pdf/general/accounting/transactions.php?id=" + currentStudentAccountingId;

            } else {
                var url = app_url + "modules/pdf/" + reportsFolder + "/accounting/transactions.php?id=" + currentStudentAccountingId;

            }
            //url += "&year=" + currentPeriodId
            url += "&grade=" + currentStudentAccountingPos['stream']['id']
            url += "&school=" + schoolId;

            window.open(url);
        })

    }


}


function newTransactionForm(id) {
    var form = "<div class='modal'><form>\
                <h4>Item</h4>\
                <input type='text' id='item'><br>\
                <h4>Type</h4>\
                <select id='type'>\
                <option value=0>Out</option>\
                <option value=1>In</option>\
                </select>\
                <h4>Amount</h4>\
                <input type='number' id='amount'><br>\
                <button id='save' class='new'>Save</button>\
                <button id='cancel' class='delete'>Cancel</button>"
    $('body').append(form);

    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    })

    $("#save").click(function () {
        event.preventDefault();

        var item = $("#item").val();
        var type = $("#type").val();
        var amount = $("#amount").val();
        if (item == '') {
            alert("Enter an item!")
        }
        if (amount == '') {
            alert("Enter an amount!")
        }
        if (item !== '' && amount !== '') {
            //if type is out make amount negative
            if (type == 0) {
                amount = amount * -1;
            }
            newTransaction(id, item, amount, type);
        }


    })

}

function newTransactionForm(id) {
    var form = "<div class='modal'><form>\
                <h4>Item</h4>\
                <input type='text' id='item'><br>\
                <h4>Type</h4>\
                <select id='type'>\
                <option value=0>Out</option>\
                <option value=1>In</option>\
                </select>\
                <h4>Amount</h4>\
                <input type='number' id='amount'><br>\
                <button id='save' class='new'>Save</button>\
                <button id='cancel' class='delete'>Cancel</button>"
    $('body').append(form);

    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    })

    $("#save").click(function () {
        event.preventDefault();

        var item = $("#item").val();
        var type = $("#type").val();
        var amount = $("#amount").val();
        if (item == '') {
            alert("Enter an item!")
        }
        if (amount == '') {
            alert("Enter an amount!")
        }
        if (item !== '' && amount !== '') {
            //if type is out make amount negative
            if (type == 0) {
                amount = amount * -1;
            }
            newTransaction(id, item, amount, type);
        }


    })

}

function feeForm() {
    var form = "<div class='modal'><form>\
                <h4>Item</h4>\
                <input type='text' id='item'><br>\
                <h4>Type</h4>\
                <select id='type'>\
                <option value=0>Out</option>\
                <option value=1>In</option>\
                </select>\
                <h4>Amount</h4>\
                <input type='number' id='amount'><br>\
                <select id='to'>\
                <option value=0>Whole school</option>\
                <option value=1>Selected</option>\
                </select><br>\
                <button id='save' class='new'>Save</button>\
                <button id='cancel' class='delete'>Cancel</button>"
    $('body').append(form);

    $("#cancel").click(function () {
        event.preventDefault();
        deleteModal();
    })

    $("#to").change(function () {
        var to = $("#to").val();

        if (to == 1) {

            $("#to").after("<select style='float:clear' id='grade'\
            data-placeholder='Grade(s)'\
            name='grade[]' \
            multiple class='select-grade'><select><br>");
            $("#grade").html(streamsOptions()).select2()
        }


        if (to == 0) {
            $("#grade").remove();
            $(".select2-container").remove();
        }
    })

    $("#save").click(function () {
        event.preventDefault();

        var item = $("#item").val();
        var type = $("#type").val();
        var amount = $("#amount").val();
        var to = $("#to").val();

        if (to == 1) {
            var grade = $("#grade").select2('val')

        }

        if (item == '') {
            alert("Enter an item!")
        }
        if (amount == '') {
            alert("Enter an amount!")
        }

        if (to == 1 && $("#grade").select2('val') == null) {
            alert("Please enter a grade");
        }

        if (item !== '' && amount !== '' && grade !== null) {
            //if type is out make amount negative
            if (type == 0) {
                amount = amount * -1;
            }
            var data = new FormData();
            data.append('school', schoolId);
            data.append('item', item);
            data.append('amount', amount);
            data.append('type', type);
            data.append('to', to);
            if (to == 1) {
                data.append('grade', grade);

            }

            newFee(data);
        }


    })

}