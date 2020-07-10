async function fetchTransactions(id){
    var url=app_url+"modules/dean/fetch/transaction.php";
    await $.ajax({
        url:url,
        method:"post",
        data:{
            id:id
        },
        success:function(response){
            if(isJSON(response)){
                currentStudentTransactions=JSON.parse(response);
                makeTransactionsTbl(currentStudentTransactions)

            }else{
                currentStudentTransactions='';
            
                makeTransactionsTbl(currentStudentTransactions)

            }
            
        }
    })
}