async function deleteTransaction(id) {
    if (confirm("Are you sure to delete transaction?")) {
        var url = app_url + "modules/dean/delete/transaction.php";

        await $.ajax({
            url: url,
            method: "post",
            data: {
                id: id
            },
            success: function (response) {
                if (response == 'ok') {
                    fetchTransactions(currentStudentAccountingId);
                    return true;
                }
            }
        })
    }

}