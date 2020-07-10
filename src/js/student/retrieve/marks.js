async function fetchStdMarks(period){
    var url=app_url+"modules/student/retrive/marks.php";

    await $.ajax({
        url:url,
        method:"post",
        data:{
            period:period,
            student:userId
        },
        success:function(response){
            if(isJSON(response)){
                StdMarksTable(JSON.parse(response));
            }
        }
    })
}