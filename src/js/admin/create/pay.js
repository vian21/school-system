function pay(school,name,months){
    var url= app_url+"modules/admin/create/pay.php";
    $.ajax({
        url:url,
        method:"post",
        data:{
            school:school,
            name:name,
            months:months,
            end:end
        },
        success:function(response){
            if(response=='ok'){
                alert("Paid")
                $('.modal').remove();

            }
            else{
                alert("Failed to pay!")
            }
        }
    })
}