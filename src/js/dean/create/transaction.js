async function newTransaction(student, item, amount, type) {
    var url = app_url + "modules/dean/create/transaction.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            student: student,
            item: item,
            amount: amount,
            type: type
        },
        success: function (response) {
            if (response == "ok") {
                alert("Transaction saved")
                deleteModal();
                fetchTransactions(student)
            }
            else {
                alert("Failed to save")
            }
        }
    })
}