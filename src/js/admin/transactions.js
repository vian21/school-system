$(document).ready(function () {
    fetchTransactions().then(function () {
        makeTransactionsTable();
    })
})

function makeTransactionsTable() {
    var table = "<table><tr><th>#</th><th>school</th><th>ID</th><th>Date</th><th>Period</th><th>End</th></tr>"

    for (var i = 0; i < transactions.length; i++) {
        var number = i + 1;
        table += "<tr>"
        table += "<td>" + number + "</td>"
        table += "<td>" + transactions[i]['school_name'] + "</td>"
        table += "<td>" + transactions[i]['school_id'] + "</td>"
        table += "<td>" + transactions[i]['date'] + "</td>"
        table += "<td>" + transactions[i]['period'] + "</td>"
        table += "<td>" + transactions[i]['end'] + "</td>"

        table += "</tr>";
    }
    table += "</table>";
    $("#table").html(table);
}