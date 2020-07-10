async function fetchTransactions() {
    var url = app_url + "modules/admin/retrieve/transactions.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            school: schoolId
        },
        success: function (response) {
            if (isJSON(response)) {
                transactions = JSON.parse(response);
            }
            return true;
        }
    })
}